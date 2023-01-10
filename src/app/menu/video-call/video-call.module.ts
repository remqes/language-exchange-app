import { VideoCallComponent } from './video-call/video-call.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCallRoutingModule } from './video-call-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VideoCallDialogComponent } from './video-call-dialog/video-call-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { ClipboardModule } from '@angular/cdk/clipboard';

@NgModule({
  declarations: [
    VideoCallComponent,
    VideoCallDialogComponent,
  ],
  imports: [
    CommonModule,
    VideoCallRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    ClipboardModule
  ]
})
export class VideoCallModule { }
