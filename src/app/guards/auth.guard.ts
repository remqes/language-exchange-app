import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router){}
  isAuthenticated: boolean;

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean | UrlTree> {
      const user = await this.afAuth.currentUser;

      if(localStorage.getItem('token') || localStorage.getItem('googleToken')) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = user ? true : false;
      }
      if (!this.isAuthenticated) {
        this.router.navigate(['/not-found']);
      }
      return this.isAuthenticated;
  }
}
