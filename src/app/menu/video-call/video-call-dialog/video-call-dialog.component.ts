import { Inject } from '@angular/core';
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  peerId?: string | null;
  joinCall: boolean
}

@Component({
  selector: 'app-video-call-dialog',
  templateUrl: './video-call-dialog.component.html',
  styleUrls: ['./video-call-dialog.component.css']
})
export class VideoCallDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<VideoCallDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar
) { }

public showCopiedSnackBar() {
    this.snackBar.open('Peer ID Copied!', 'Hurrah', {
    duration: 1000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  });
}

}
