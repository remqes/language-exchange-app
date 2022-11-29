import { AuthService } from './../../auth/auth.service';
import { UserService } from './user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, concatMap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user.model';
import { UploadImageService } from './upload-image.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.css']
})
export class ProfileSettingsComponent implements OnInit, OnDestroy {
  userUID: string;
  user$ = this.userService.currentUserProfile$;
  uid: string;
  private subscription: Subscription;
  userScore: number;

  profileSettingsForm = new FormGroup({
    name: new FormControl(''),
    bio: new FormControl(''),
    profilePicturePath: new FormControl(''),
  });

  constructor(private userService: UserService, private router: Router, private uploadService: UploadImageService, private afAuth: AngularFireAuth) {  }

  uploadImage(event: any, user: User) {
    const fileName = event.target.files[0].name.split('.');
    this.profileSettingsForm.setValue({ name: this.profileSettingsForm.get('name')?.value, bio: this.profileSettingsForm.get('bio')?.value ,profilePicturePath: `/${this.userUID}/profilePictures/${fileName[0]}` });
    this.uploadService.uploadImage(event.target.files[0], `${this.userUID}/profilePictures/${fileName[0]}`).pipe(
      concatMap((photoURL) => this.userService.updatePicture({ uid: this.userUID, photoURL }))
    ).subscribe();
  }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userUID = user.uid;
      } else {
        console.error('not logged')
      }});
    this.subscription = this.userService.currentUserProfile$.subscribe((user) => {
      this.profileSettingsForm.patchValue({ ...user });
    },
    err => console.error('err: ', err));

    this.user$.subscribe((data => this.userScore = data?.score !== undefined ? data.score : 0))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  save() {
    const { ...data} = this.profileSettingsForm.value;
    this.userService.updateUser({ ...data, score: this.userScore }, this.userUID);
    this.router.navigate(['/profile']);
  }

}
