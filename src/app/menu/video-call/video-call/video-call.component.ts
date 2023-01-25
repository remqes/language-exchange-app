import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';
import { DialogData, VideoCallDialogComponent } from '../video-call-dialog/video-call-dialog.component';
import { VideoCallService } from '../video-call.service';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit {
  public isCallStarted$: Observable<boolean>;
  private peerId: string;
  micActive = this.videoCallService.micActive;

  @ViewChild('localVideo') localVideo: ElementRef<HTMLVideoElement>;
  @ViewChild('remoteVideo') remoteVideo: ElementRef<HTMLVideoElement>;

  constructor(public dialog: MatDialog, private videoCallService: VideoCallService) {
    this.isCallStarted$ = this.videoCallService.isCallStarted$;
    this.isCallStarted$.pipe(tap(data => console.info('informations: ', data)));
    this.peerId = this.videoCallService.initPeer();
  }

  ngOnInit(): void {
    this.videoCallService.localStream$
      .pipe(filter(res => !!res))
      .subscribe(stream => this.localVideo.nativeElement.srcObject = stream)
    this.videoCallService.remoteStream$
      .pipe(filter(res => !!res))
      .subscribe(stream => this.remoteVideo.nativeElement.srcObject = stream)
  }

  ngOnDestroy(): void {
    this.videoCallService.destroyPeer();
  }

  public showModal(joinCall: boolean): void {
    let dialogData: DialogData = joinCall ? ({ peerId: null, joinCall: true }) : ({ peerId: this.peerId, joinCall: false });
    const dialogRef = this.dialog.open(VideoCallDialogComponent, {
      width: '250px',
      data: dialogData
    });

    dialogRef.afterClosed()
      .pipe(
        switchMap(peerId =>
          joinCall ? of(this.videoCallService.establishMediaCall(peerId)) : of(this.videoCallService.enableCallAnswer())
        ),
      )
      .subscribe(_  => { });
  }

  public endCall() {
    this.videoCallService.closeMediaCall();
  }

  muteMicrophone() {
    if (this.localVideo) {

      this.micActive = false;
    }
  }

  unmuteMicrophone() {
    if (this.localVideo) {

      this.micActive = true;
    }
  }
}
