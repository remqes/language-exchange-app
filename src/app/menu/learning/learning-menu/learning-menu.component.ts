import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learning-menu',
  templateUrl: './learning-menu.component.html',
  styleUrls: ['./learning-menu.component.css']
})
export class LearningMenuComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
