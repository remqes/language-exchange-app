import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'my-profile',
    component: MyProfileComponent,
  },
  {
    path: 'settings',
    component: ProfileSettingsComponent,
  },
  {
    path: '',
    redirectTo: 'my-profile',
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule { }
