import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  navigateTo: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') || localStorage.getItem('googleToken')) {
      this.navigateTo = 'chats';
      this.router.navigate(['/chats']);
    } else {
      this.navigateTo = 'main';
      this.router.navigate(['/main']);
    }
    console.info('navigateto: ', this.navigateTo)
  }

}
