import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showPassword: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  constructor(private auth: AuthService, private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    if(!this.email?.errors && !this.password?.errors) {
      this.auth.login(this.email?.value, this.password?.value);
    }
  }

  loginGoogle() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider).then((res) => {
      localStorage.setItem('googleToken', 'true');
      this.router.navigate(['/chats']);
    },
    err => {
      alert('Somethings wrong!');
    });
  }

  togglePassword(password: string) {
    this.showPassword = !this.showPassword;
  }

}
