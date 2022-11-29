import { AuthGuard } from './guards/auth.guard';
import { MainPageComponent } from './menu/main/main-page/main-page.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'chats',
    loadChildren: () => import('./menu/chats/chats.module').then((m) => m.ChatsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    loadChildren: () => import('./menu/profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'partners',
    loadChildren: () => import('./menu/partners/partners.module').then((m) => m.PartnersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'learning',
    loadChildren: () => import('./menu/learning/learning.module').then((m) => m.LearningModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'video-call',
    loadChildren: () => import('./menu/video-call/video-call.module').then((m) => m.VideoCallModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'signup',
    loadChildren: () => import('./menu/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'main',
    component: MainPageComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
