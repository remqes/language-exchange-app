import { LearningService } from './../../../learning.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { isEmpty, map, Observable, Subscription, tap } from 'rxjs';
import arrayShuffle from 'array-shuffle';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { ScoreDialogComponent } from '../../../score-dialog/score-dialog.component';
import { MatDialog } from '@angular/material/dialog';

export interface Unscramble {
  name: string;
  image: string;
}

@Component({
  selector: 'app-letter-view',
  templateUrl: './letter-view.component.html',
  styleUrls: ['./letter-view.component.css']
})
export class LetterViewComponent implements OnDestroy, OnInit {

  fetchData$: Observable<Unscramble[]>;
  fetchData: Subscription;
  actualIndex: number = 0;
  saveToArray: Subscription;
  nameArray: Array<string>;
  wordArray: Array<string>;
  answerWord: Array<string>;
  mixedWord: string;
  displayedWord: string;
  isWrong: boolean = false;
  score: number = 0;
  isLoadedData: boolean = true;
  goNextButton: boolean = true;

  constructor(private learningService: LearningService, private dialog: MatDialog, private router: Router) { }

  checkAnswer() {
    this.mixedWord = this.answerWord.join("");
    if(this.mixedWord === this.nameArray[this.actualIndex]) {
      this.moveNext();
      this.score += 20;
    } else {
      this.isWrong = true;
    }
    if (this.actualIndex === 8) {
      this.goNextButton = false;
    }
  }

  ngOnDestroy(): void {
      if (this.isLoadedData) {
        this.fetchData.unsubscribe();
        this.saveToArray.unsubscribe();
      }
  }

  ngOnInit(): void {
    this.fetchData$ = this.learningService.fetchData();
    this.fetchData = this.fetchData$.pipe(
      map(data => data),
      isEmpty(),
      tap(data => {
        if (data)
          this.isLoadedData = !data
      })
    ).subscribe();
    if (this.isLoadedData) {
      this.saveToArray = this.fetchData$.pipe(map(data => data.map(data => data.name))).subscribe(data => {
        this.nameArray = data;
        this.randomWords();
      });
    }
  }

  saveAnswer() {
    let dialogRef = this.dialog.open(ScoreDialogComponent, {
      data: { score: this.score },
    });
    dialogRef.afterClosed().subscribe((_) => {
      this.router.navigate(['/learning/menu']);
    });
  }

  moveNext() {
    if (this.actualIndex === 8) {
      this.goNextButton = false;
    }
    if (this.actualIndex !== 9) {
      this.actualIndex++;
      this.isWrong = false;
      this.randomWords();
    }
  }

  randomWords() {
    this.wordArray = this.nameArray[this.actualIndex].split("");
    this.wordArray = arrayShuffle(this.wordArray);
    this.displayedWord = this.wordArray.join("");
    this.answerWord = this.wordArray;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  back() {
    this.router.navigate(['/learning/menu']);
  }
}
