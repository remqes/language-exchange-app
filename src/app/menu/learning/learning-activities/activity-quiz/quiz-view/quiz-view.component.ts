import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { isEmpty, map, Observable, Subscription, tap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LearningService } from '../../../learning.service';
import { MatDialog } from '@angular/material/dialog';
import { ScoreDialogComponent } from '../../../score-dialog/score-dialog.component';

export interface Quiz {
  question: string;
  correctAnswer: string;
  incorrectAnswer1: string;
  incorrectAnswer2: string;
}

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.css']
})
export class QuizViewComponent implements OnInit, OnDestroy {
  score: number = 0;
  isLoadedData: boolean = true;
  answers: boolean = false;

  fetchData$: Observable<Quiz[]>;
  fetchData: Subscription;
  checkData: Subscription;
  questions: Array<string> = [];
  correctAnswers: Array<string> = [];

  form: FormGroup;
  fetchQuiz: Quiz[];

  constructor(
    private router: Router,
    private learningService: LearningService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog) {
      this.form = this.formBuilder.group({});
    }

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
          this.isLoadedData = !data;
      })
    ).subscribe();

    if (this.isLoadedData) {
      this.fetchData = this.fetchData$.pipe(
        tap(data => {
          this.fetchQuiz = data;
          this.fetchQuiz.forEach((quiz) => {
            this.questions.push(quiz.question);
            this.correctAnswers.push(quiz.correctAnswer);
            this.form.addControl(quiz.question, new FormControl('', [Validators.required]));
          })
        }),
        map((data) => data)
      ).subscribe(console.info);
    }
  }

  submit() {
    if (this.form.valid) {
      for (let i = 0; i < this.correctAnswers.length; i++) {
        if (this.form.get(this.questions[i])!.value === this.correctAnswers[i]) {
          this.score += 50;
        }
      }
      let dialogRef = this.dialog.open(ScoreDialogComponent, {
        data: { score: this.score }
      });
      dialogRef.afterClosed().subscribe((_) => {
        this.router.navigate(['/learning/menu']);
      });
    }
  }

  back() {
    this.router.navigate(['/learning/menu']);
  }
}
