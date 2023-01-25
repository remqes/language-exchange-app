import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import Peer from 'peerjs';
import * as PeerAll from 'peerjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {

  private peer: Peer;
  private mediaCall: PeerAll.MediaConnection;

  private localStreamBs: BehaviorSubject<MediaStream | null> = new BehaviorSubject<MediaStream | null>(null);
  public localStream$ = this.localStreamBs.asObservable();
  private remoteStreamBs: BehaviorSubject<MediaStream | null> = new BehaviorSubject<MediaStream | null>(null);
  public remoteStream$ = this.remoteStreamBs.asObservable();

  private isCallStartedBs = new Subject<boolean>();
  public isCallStarted$ = this.isCallStartedBs.asObservable();

  stream: MediaStream | null;
  micActive: boolean;

  constructor(private snackBar: MatSnackBar) { }

  public initPeer(): any {
      if (!this.peer || this.peer.disconnected) {
          const peerJsOptions: PeerAll.PeerJSOption = {
              debug: 3,
              config: {
                  iceServers: [
                      {
                          urls: [
                              'stun:stun1.l.google.com:19302',
                              'stun:stun2.l.google.com:19302',
                          ],
                      }]
              }
          };
          try {
              let id = uuidv4();
              this.peer = new Peer(id, peerJsOptions);
              return id;
          } catch (error) {
              console.error(error);
          }
      }
  }

  public async establishMediaCall(remotePeerId: string) {
      try {
          this.stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

          this.micActive = true;

          const connection = this.peer.connect(remotePeerId);
          connection.on('error', err => {
              console.error(err);
              this.snackBar.open((<any>err), 'Close');
          });

          this.mediaCall = this.peer.call(remotePeerId, this.stream);
          if (!this.mediaCall) {
              let errorMessage = 'Unable to connect to remote peer';
              this.snackBar.open(errorMessage, 'Close');
              throw new Error(errorMessage);
          }
          this.localStreamBs.next(this.stream);
          this.isCallStartedBs.next(true);

          this.mediaCall.on('stream',
              (remoteStream) => {
                  this.remoteStreamBs.next(remoteStream);
              });
          this.mediaCall.on('error', err => {
              this.snackBar.open((<any>err), 'Close');
              console.error(err);
              this.isCallStartedBs.next(false);
          });
          this.mediaCall.on('close', () => this.onCallClose());
      }
      catch (ex: any) {
          console.error(ex);
          this.snackBar.open(ex, 'Close');
          this.isCallStartedBs.next(false);
      }
  }

  public async enableCallAnswer() {
      try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          this.localStreamBs.next(stream);
          this.peer.on('call', async (call) => {

              this.mediaCall = call;
              this.isCallStartedBs.next(true);

              this.mediaCall.answer(stream);
              this.mediaCall.on('stream', (remoteStream) => {
                  this.remoteStreamBs.next(remoteStream);
              });
              this.mediaCall.on('error', err => {
                  this.snackBar.open((<any>err), 'Close');
                  this.isCallStartedBs.next(false);
                  console.error(err);
              });
              this.mediaCall.on('close', () => this.onCallClose());
          });
      }
      catch (ex: any) {
          console.error(ex);
          this.snackBar.open(ex, 'Close');
          this.isCallStartedBs.next(false);
      }
  }

  private onCallClose() {
      this.remoteStreamBs?.value!.getTracks().forEach(track => {
          track.stop();
      });
      this.localStreamBs?.value!.getTracks().forEach(track => {
          track.stop();
      });
      this.snackBar.open('Call Ended', 'Close');
  }

  public closeMediaCall() {
      this.mediaCall?.close();
      if (!this.mediaCall) {
          this.onCallClose()
      }
      this.isCallStartedBs.next(false);
  }

  public destroyPeer() {
      this.mediaCall?.close();
      this.peer?.disconnect();
      this.peer?.destroy();
  }

  muteMicrophone() {
    if (this.stream) {
      this.stream.getAudioTracks()[0].enabled = false;
      console.info('stream mute: ', navigator.mediaDevices)
      this.micActive = false;
    }
  }

  unmuteMicrophone() {
    if (this.stream) {
      
      console.info('stream unmute: ', navigator.mediaDevices)
      this.micActive = true;
    }
  }

}
