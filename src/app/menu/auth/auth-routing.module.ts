import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

const redirectWhenLogged = () => redirectLoggedInTo(['/chats']);

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectWhenLogged),
  },
  {
    path: 'register',
    component: RegisterComponent,
    ...canActivate(redirectWhenLogged),
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
    ...canActivate(redirectWhenLogged),
  },
  {
    path : '',
    redirectTo: 'main',
    pathMatch: 'full',
    ...canActivate(redirectWhenLogged),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
