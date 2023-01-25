import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { isEmpty, map, Observable, Subscription, tap } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LearningService } from '../../../learning.service';
import { ScoreDialogComponent } from '../../../score-dialog/score-dialog.component';

export interface Puzzle {
  question: string;
  correctAnswer: string;
  incorrectAnswer1: string;
  incorrectAnswer2: string;
}

@Component({
  selector: 'app-puzzle-view',
  templateUrl: './puzzle-view.component.html',
  styleUrls: ['./puzzle-view.component.css']
})
export class PuzzleViewComponent implements OnInit, OnDestroy {
  score: number = 0;
  isLoadedData: boolean = true;
  answers: boolean = false;

  fetchData$: Observable<Puzzle[]>;
  fetchData: Subscription;
  checkData: Subscription;
  questions: Array<string> = [];
  correctAnswers: Array<string> = [];

  puzzleForm: FormGroup;
  fetchPuzzle: Puzzle[];

  constructor(
    private router: Router,
    private learningService: LearningService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog) {
      this.puzzleForm = this.formBuilder.group({});
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
          this.fetchPuzzle = data;
          this.fetchPuzzle.forEach((puzzle) => {
            this.questions.push(puzzle.question);
            this.correctAnswers.push(puzzle.correctAnswer);
            this.puzzleForm.addControl(puzzle.question, new FormControl('', [Validators.required]));
          })
        }),
        map((data) => data)
      ).subscribe();
    }
  }

  submit() {
    if (this.puzzleForm.valid) {
      for (let i = 0; i < this.correctAnswers.length; i++) {
        if (this.puzzleForm.get(this.questions[i])!.value === this.correctAnswers[i]) {
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
