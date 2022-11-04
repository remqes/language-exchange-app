import { AuthService } from './../auth.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  isEmailSended: boolean;

  reminderForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  get email() {
    return this.reminderForm.get('email');
  }

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate(['/signup/login']);
  }

  send() {
    console.info(this.email?.errors)
    if(!this.email?.errors) {
      this.auth.resetPassword(this.email?.value);
      this.isEmailSended = true;
    }

  }

}
