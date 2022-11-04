import { UserService } from './user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {

  user$ = this.userService.currentUserProfile$;
  private subscription: Subscription;

  profileSettingsForm = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl(''),
    bio: new FormControl(''),
    profilePicturePath: new FormControl(''),
  });

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.subscription = this.userService.currentUserProfile$.subscribe((user) => {
      console.info('user: ', user)
      this.profileSettingsForm.patchValue({ ...user });
    },
    err => console.info('err: ', err));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save() {
    const { uid, ...data} = this.profileSettingsForm.value;
    this.userService.updateUser({ uid, ...data })
  }

}
