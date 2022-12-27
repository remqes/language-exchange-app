import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  map,
  Observable,
  tap,
  Subscription,
  from,
  Subject,
  share,
  multicast,
  toArray,
} from 'rxjs';
import { LearningService } from '../../../learning.service';
import { ScoreDialogComponent } from '../../../score-dialog/score-dialog.component';

export interface Flashcard {
  answer: string;
  hint: string;
  image: string;
  name: string;
}

@Component({
  selector: 'app-flashcards-view',
  templateUrl: './flashcards-view.component.html',
  styleUrls: ['./flashcards-view.component.css'],
})
export class FlashcardsViewComponent implements OnInit, OnDestroy {
  buttonName: string = 'Next';
  hintAmount: number = 2;
  hintName: string = `Hint (${this.hintAmount})`;
  actualIndex: number = 0;
  score: number = 0;
  showHint1: boolean = false;
  showHint2: boolean = false;
  answers: Array<string>;
  fetchData$: Observable<Flashcard[]>;
  fetchData: Subscription;
  saveToArray: Subscription;
  isWrong: boolean = false;
  goNextButton: boolean = true;

  answerForm = this.formBuilder.group({
    answer: [''],
  });

  constructor(
    private learningService: LearningService,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  checkAnswer() {
    if (this.answerValue == this.answers[this.actualIndex]) {
      this.moveNext();
    } else {
      this.isWrong = true;
    }
  }

  get answerValue() {
    return this.answerForm.get('answer')?.value;
  }

  ngOnInit(): void {
    this.fetchData$ = this.learningService.fetchData();
    this.fetchData = this.fetchData$.subscribe((data) =>
      console.info('data1: ', data)
    );
    this.saveToArray = this.fetchData$
      .pipe(map((data) => data.map((data) => data.answer)))
      .subscribe((data) => {
        this.answers = data;
      });
  }

  ngOnDestroy(): void {
    this.fetchData.unsubscribe();
    this.saveToArray.unsubscribe();
  }

  showHint() {
    this.hintAmount--;
    if (this.hintAmount !== 0) {
      this.hintName = `Hint (${this.hintAmount})`;
      if (this.hintAmount === 1) {
        this.showHint1 = true;
      }
    }
    if (this.hintAmount === 0) {
      this.hintName = 'Skip';
      this.showHint2 = true;
    }
    if (this.hintAmount < 0) {
      this.moveNext();
    }
  }

  saveAnswers() {
    let dialogRef = this.dialog.open(ScoreDialogComponent, {
      data: { score: this.score },
    });
    dialogRef.afterClosed().subscribe((_) => {
      this.router.navigate(['/learning/menu']);
    });
  }

  moveNext() {
    this.answerForm.reset();
    switch (this.hintAmount) {
      case 2:
        this.score += 25;
        break;
      case 1:
        this.score += 15;
        break;
      case 0:
        this.score += 5;
        break;
    }
    if (this.actualIndex !== 9) {
      this.actualIndex++;
      this.isWrong = false;
      this.hintAmount = 2;
      this.hintName = `Hint (${this.hintAmount})`;
      this.showHint1 = false;
      this.showHint2 = false;
    } else {
      this.hintName = '';
      this.goNextButton = false;
    }
  }
}
