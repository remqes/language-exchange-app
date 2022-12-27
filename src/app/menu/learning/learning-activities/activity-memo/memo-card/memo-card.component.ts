import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MemoCard } from '../memo-view/memo-view.component';


@Component({
  selector: 'app-memo-card',
  templateUrl: './memo-card.component.html',
  styleUrls: ['./memo-card.component.css'],
  animations: [
    trigger('cardFlip', [
      state('default', style({
        transform: 'none',
      })),
      state('flipped', style({
        transform: 'perspective(600px) rotateY(180deg)',
      })),
      state('matched', style({
        visibility: 'false',
        transform: 'scale(0.05)',
        opacity: 0,
      })),
      transition('default => flipped', [
        animate('400ms'),
      ]),
      transition('flipped => default', [
        animate('400ms'),
      ]),
      transition('* => matched', [
        animate('400ms'),
      ])
    ])
  ]
})
export class MemoCardComponent implements OnInit {

  @Input() data: MemoCard;
  @Output() choosedCard = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

}
