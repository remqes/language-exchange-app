import { LearningService } from './../../../learning.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ScoreDialogComponent } from '../../../score-dialog/score-dialog.component';
import { isEmpty, map, Observable, Subscription, tap } from 'rxjs';
import arrayShuffle from 'array-shuffle';
import { Router } from '@angular/router';

export interface MemoCard {
  name: string;
  image: string;
  state: 'default' | 'flipped' | 'matched';
}

@Component({
  selector: 'app-memo-view',
  templateUrl: './memo-view.component.html',
  styleUrls: ['./memo-view.component.css']
})
export class MemoViewComponent implements OnDestroy, OnInit {

  fetchData$: Observable<MemoCard[]>;
  fetchData: Subscription;
  fetchNames: Subscription;
  checkData: Subscription;

  itemsArray: Array<MemoCard>;
  namesArray: Array<string>;
  cardsArray: Array<MemoCard> = [];

  actualIndex: number = 0;
  score: number = 0;
  isGameStarted: boolean = false;
  disableCards: boolean = false;
  isLoadedData: boolean = true;

  constructor(private dialog: MatDialog, private learningService: LearningService, private router: Router) {}

  ngOnDestroy(): void {
      if (this.isLoadedData) {
        this.checkData.unsubscribe();
        this.fetchNames.unsubscribe();
        this.fetchData.unsubscribe();
      }
  }

  ngOnInit(): void {
    this.fetchData$ = this.learningService.fetchData();
    this.checkData = this.fetchData$.pipe(
      map(data => data),
      isEmpty(),
      tap(data => {
        if (data)
          this.isLoadedData = !data;
      })
    ).subscribe();
    if (this.isLoadedData) {
      this.fetchData = this.fetchData$.subscribe((data) => {
        this.itemsArray = data;
        this.setupCards();
      });
      this.fetchNames = this.fetchData$.pipe(map((data) => data.map((data) => data.name))).subscribe((data) => {
        this.namesArray = data;
      });
    }
  }

  setupCards(): void {
    this.itemsArray.forEach((item) => {
      const memoCardData: MemoCard = {
        name: item.name,
        image: item.image,
        state: 'default'
      };
      this.cardsArray.push({ ...memoCardData });
    });
    this.cardsArray = arrayShuffle(this.cardsArray);
  }

  startGame(): void {
    this.isGameStarted = !this.isGameStarted
  }

  choosedCard(card: MemoCard): void {
    if(this.isGameStarted && !this.disableCards) {
      if (card.state === 'default') {
        card.state = 'flipped';
        this.checkForCardMatch(card);
      } else if (card.state === 'flipped') {
        card.state = 'default';
      }
    }

  }

  checkForCardMatch(card: MemoCard): void {
    this.disableCards = true;
    setTimeout(() => {
      const state = card.name === this.namesArray[this.actualIndex] ? 'matched' : 'default';
      card.state = state;
      if (card.name === this.namesArray[this.actualIndex] && this.actualIndex !== 10) {
        this.actualIndex++;
        this.score += 25;
      }
      if(this.actualIndex === 10) {
        let dialogRef = this.dialog.open(ScoreDialogComponent, {
          data: { score: this.score }
        });
        dialogRef.afterClosed().subscribe((_) => {
          this.router.navigate(['/learning/menu']);
        });
      }
      this.disableCards = false;
    }, 1000);
  }

  back() {
    this.router.navigate(['/learning/menu']);
  }
}
