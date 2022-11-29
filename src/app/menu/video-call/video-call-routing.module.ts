import { VideoCallComponent } from './video-call/video-call.component';
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'menu',
    component: VideoCallComponent,
  },
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoCallRoutingModule { }
