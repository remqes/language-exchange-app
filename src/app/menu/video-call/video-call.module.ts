import { VideoCallComponent } from './video-call/video-call.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoCallRoutingModule } from './video-call-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    VideoCallComponent,
  ],
  imports: [
    CommonModule,
    VideoCallRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class VideoCallModule { }
