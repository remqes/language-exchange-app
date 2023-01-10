import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { UserService } from '../profile/profile-settings/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = authState(this.auth);
  isLogged: boolean = false;

  constructor(
    private auth: Auth,
    private afAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService) { }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then((res) => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/chats']);
    },
    err => {
      this.router.navigate(['/signup/login']);
    });
  }

  register(email: string, password: string, confirmPassword: string) {
    if (password === confirmPassword) {
      this.afAuth.createUserWithEmailAndPassword(email, password).then((res) => {
        const uid = res.user?.uid !== undefined ? res.user.uid : '';
        this.userService.addUser( { uid });
        localStorage.setItem('token', 'true');
        this.router.navigate(['/profile/settings']);
      },
      err => {
        this.router.navigate(['/signup/register']);
      });
    }
  }

  logout() {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/main']);
    },
    err => {
      console.error("Somethings wrong: ", err);
    });
  }

  resetPassword(email: string) {
    this.afAuth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/signup/reset-password']);
    },
    err => {
      alert('An error occured!');
    });
  }
}
