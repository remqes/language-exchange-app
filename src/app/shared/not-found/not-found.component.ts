import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  navigateTo: string;

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem('token') || localStorage.getItem('googleToken')) {
      this.navigateTo = 'chats';
    } else {
      this.navigateTo = 'main';
    }
    console.info('navigateto: ', this.navigateTo)
  }

}
