import { Router } from '@angular/router';
import { LearningService } from './../../../learning.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { isEmpty, map, Observable, Subscription, take, tap } from 'rxjs';
import arrayShuffle from 'array-shuffle';
import { ScoreDialogComponent } from '../../../score-dialog/score-dialog.component';

interface Respond {
  text: string;
}

@Component({
  selector: 'app-gaps-view',
  templateUrl: './gaps-view.component.html',
  styleUrls: ['./gaps-view.component.css']
})
export class GapsViewComponent implements OnDestroy, OnInit {

  fillGaps: Array<string> = ['(1)_____', '(2)_____', '(3)_____'];
  textArray: Array<string> = [];
  numbersArray: Array<number> = [];
  answers: Array<string> = [];
  userAnswers: Array<string> = [];
  score: number = 0;

  fetchData$: Observable<any>;
  fetchData: Subscription;
  checkData: Subscription;
  text: string;
  isLoadedData: boolean = true;

  constructor(
    private learningService: LearningService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnDestroy(): void {
      if (this.isLoadedData) {
        this.fetchData.unsubscribe();
        this.checkData.unsubscribe();
      }
  }

  ngOnInit(): void {
    this.fetchData$ = this.learningService.fetchData();
    this.checkData = this.fetchData$.pipe(
      map(data => data),
      isEmpty(),
      tap(data => {
        if (data)
          this.isLoadedData = !data
      })
    ).subscribe();
    if (this.isLoadedData) {
      this.fetchData = this.fetchData$.pipe(map(data => data.map(data => data.text))).subscribe(data => {
        this.text = this.changeText(data);
      });
    }
  }

  changeText(text: string) {
    this.textArray = text.toString().split(/[ ]/).filter(text => text !== "");
    this.generateNumbers(this.textArray);
    for(let i = 0; i < 3; i++) {
      const number = this.numbersArray[i];
      this.answers.push(this.removeLastCharacter(this.textArray[number].toLowerCase()));
      this.textArray[number] = this.fillGaps[i];
    }
    return this.textArray.join(' ');
  }

  generateRandomNumber(arrayLength: number): number {
    const randomNumber = Math.floor(Math.random() * (arrayLength - 1));
    return randomNumber;
  }

  generateNumbers(array: Array<string>) {
    for (let i = 0; i < 3; i++) {
      let number = this.generateRandomNumber(array.length);
      switch (i) {
        case 0: this.numbersArray.push(number);
        break;
        case 1: while (number === this.numbersArray[0]) {
          number = this.generateRandomNumber(array.length);
        };
        this.numbersArray.push(number);
        break;
        case 2: while (number === this.numbersArray[0] || number === this.numbersArray[1]) {
          number = this.generateRandomNumber(array.length);
        };
        this.numbersArray.push(number);
        break;
      }
    }
    this.numbersArray.sort((a, b) => a - b);
  }

  removeLastCharacter(text: string) {
    const charactersToRemove = ['!', '?', ',', '.', '\'', '’', '‘'];
    if (charactersToRemove.includes(text[text.length - 1])) {
      return text.slice(0, -1);
    }
    return text;
  }

  confirm() {
    if (this.userAnswers[0] && this.userAnswers[1] && this.userAnswers[2]) {
      for (let i = 0; i < 3; i++) {
        this.userAnswers[i] === this.answers[i] ? this.score += 50 : this.score += 0;
      }
    }
    let dialogRef = this.dialog.open(ScoreDialogComponent, {
      data: { score: this.score }
    });
    dialogRef.afterClosed().subscribe((_) => {
      this.router.navigate(['/learning/menu']);
    });
  }

  back() {
    this.router.navigate(['/learning/menu']);
  }
}
