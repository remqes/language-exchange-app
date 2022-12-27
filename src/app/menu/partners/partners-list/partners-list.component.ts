import { map, Observable, Subscription, tap } from 'rxjs';
import { UserService } from './../../profile/profile-settings/user.service';
import { ChatsService } from './../../chats/chats.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-partners-list',
  templateUrl: './partners-list.component.html',
  styleUrls: ['./partners-list.component.css']
})
export class PartnersListComponent implements OnInit, OnDestroy {

  constructor(public userService: UserService, private storage: AngularFireStorage) { }

  users$: Observable<User[]>;
  user$: Observable<any>;
  actualUserUID: string;
  userIcon: string;
  users: Subscription;
  user: Subscription;
  index = 0;
  sortedArray: Array<User>;

  ngOnInit(): void {
    this.users$ = this.userService.users$;
    this.user$ = this.userService.currentUser$;
    this.users = this.users$.pipe(
      map(data => data.map(item => item.score ? item : {...item, score: 0})),
      map(data => data.sort((a, b) => b.score! - a.score!)))
      .subscribe(data => {
        this.sortedArray = data;
        this.sortedArray.forEach(async (user) => {
          if (user.profilePicturePath) {
            const reference = this.storage.ref(`${user.profilePicturePath}`);
            user.displayedPicture = await reference.getDownloadURL().toPromise();
          }
        })
      })
  }

  ngOnDestroy(): void {
      this.users.unsubscribe();
  }
}
