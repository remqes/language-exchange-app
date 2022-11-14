import { Component, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { UserService } from '../../profile/profile-settings/user.service';

@Component({
  selector: 'app-partners-list',
  templateUrl: './partners-list.component.html',
  styleUrls: ['./partners-list.component.css']
})
export class PartnersListComponent implements OnInit {
  user$ = this.userService.currentUserProfile$;
  users$ = combineLatest([this.userService.users$, this.user$]).pipe(
      map(([ allUsers, currentUser ]) => allUsers.filter((user) => user.name !== currentUser?.name))
    );

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.users$.subscribe((user) => console.info(user))
  }

}
