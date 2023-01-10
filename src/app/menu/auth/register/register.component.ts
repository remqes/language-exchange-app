import { UserService } from './../../profile/profile-settings/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ToastService } from 'src/app/shared/toast/toast.service';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';

export function passwordsEquality(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password && confirmPassword && password !== confirmPassword)
      return { passwordsDontMatch: true };
    return null;
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  },
  {
    validators: passwordsEquality()
  });

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  constructor(private auth: AuthService, private toastService: ToastService, private afAuth: AngularFireAuth, private router: Router, private userService: UserService) { }

  ngOnInit(): void { }

  register() {
    if (this.registerForm.valid) {
      this.auth.register(this.email?.value, this.password?.value, this.confirmPassword?.value);
    }
  }

  registerGoogle() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
      this.afAuth.signInWithPopup(googleAuthProvider).then((res) => {
        const uid = res.user?.uid !== undefined ? res.user.uid : '';
        this.userService.addUser({ uid });
        localStorage.setItem('googleToken', 'true');
        this.router.navigate(['/profile/settings']);
      },
      err => {
        alert('Something wrong!');
      });
  }

  togglePassword(password: string) {
    password === 'password' ?
            this.showPassword = !this.showPassword :
            this.showConfirmPassword = !this.showConfirmPassword;
  }

}
