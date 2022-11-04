import { Injectable } from '@angular/core';
import { Auth, authState } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { EventTypes } from 'src/app/shared/models/toast-event.model';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { UserService } from '../profile/profile-settings/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser$ = authState(this.auth);

  constructor(
    private auth: Auth,
    private afAuth: AngularFireAuth,
    private router: Router,
    private toastService: ToastService,
    private userService: UserService) { }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then((res) => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['/chats']);
    },
    err => {
      this.showToast(EventTypes.Error, err);
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
        this.showToast(EventTypes.Error, err);
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
      console.info("Somethings wrong: ", err);
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

  showToast(type: EventTypes, message: string) {
    switch (type) {
      case 'Success':
        this.toastService.successToast('Success toast title', message);
        break;
      case 'Warning':
        this.toastService.warningToast('Warning toast title', message);
        break;
      case 'Error':
        this.toastService.errorToast('Error toast title', message);
        break;
      default:
        this.toastService.infoToast('Info toast title', message);
        break;
    }
  }
}
