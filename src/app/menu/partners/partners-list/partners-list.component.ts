import { Component, OnInit } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { User } from 'src/app/model/user.model';
import { UserService } from '../../profile/profile-settings/user.service';
import { Sort } from '@angular/material/sort';

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
  usersSorted: User[];

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.users$.subscribe((user) => {
      this.usersSorted = user.slice();
      this.sortUsers();
    });
  }

  sortUsers() {
    this.usersSorted = this.usersSorted.sort((userA, userB) => {
      const userAScore = userA.score !== undefined ? userA.score : 0;
      const userBScore = userB.score !== undefined ? userB.score : 0;
      return compare(userAScore, userBScore, false);
    })
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
