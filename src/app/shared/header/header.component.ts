import { ReportDialogComponent } from './../report-dialog/report-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from './../../menu/profile/profile-settings/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from './../../menu/auth/auth.service';
import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements DoCheck, OnInit {
  isUserLogged: boolean;
  userUID: string;
  user$ = this.userService.currentUserProfile$;

  constructor(
    private auth: AuthService,
    private afAuth: AngularFireAuth,
    private router: Router,
    private userService: UserService,
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private dialog: MatDialog,
    ) {}

  ngDoCheck(): void {
    localStorage.getItem('token') || localStorage.getItem('googleToken') ? this.isUserLogged = true :  this.isUserLogged = false;
  }

  ngOnInit(): void {
    this.user$ = this.user$.pipe(
      tap(data => this.userUID = data?.uid!),
      map(data => {
        if (data) {
          this.firestore.collection('users').doc(data.uid).ref.get().then(reference => {
            this.storage.ref(`${reference.get('profilePicturePath')}`).getDownloadURL().subscribe(image => {
              data.displayedPicture = image;
            });
          });
        }
        return data;
      }),
    );
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

  goToSettings() {
    this.router.navigate(['/profile/settings']);
  }

  goToTranslate() {
    window.open('https://translate.google.com', '_blank');
  }

  reportIssue() {
    const reportedUser = '';
    let dialogRef = this.dialog.open(ReportDialogComponent,
      { data: { userId: this.userUID, reportedUser: reportedUser} });
    dialogRef.afterClosed().subscribe((_) => {
      this.router.navigate(['/learning/chats']);
    });
  }

}
