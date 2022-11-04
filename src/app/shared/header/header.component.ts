import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './../../menu/auth/auth.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements DoCheck, OnInit {
  isUserLogged: boolean;

  constructor(private auth: AuthService, private afAuth: AngularFireAuth, private router: Router) {
  }

  ngDoCheck(): void {
    localStorage.getItem('token') || localStorage.getItem('googleToken') ? this.isUserLogged = true :  this.isUserLogged = false;
  }

  ngOnInit(): void {
  }

  logout() {
    if (localStorage.getItem('googleToken')) {
      this.afAuth.signOut();
      localStorage.removeItem('googleToken');
      this.router.navigate(['/main']);
    } else if (localStorage.getItem('token')) {
      this.auth.logout();
    } else {
      alert('Error');
    }
    this.isUserLogged = false;
  }

}