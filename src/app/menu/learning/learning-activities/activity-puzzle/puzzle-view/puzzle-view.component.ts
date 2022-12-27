import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ENDPOINTURL } from 'src/app/environments/environment';
import { Quiz } from 'src/app/shared/models/activities.model';
import { LearningService } from '../../../learning.service';
import { ScoreDialogComponent } from '../../../score-dialog/score-dialog.component';

@Component({
  selector: 'app-puzzle-view',
  templateUrl: './puzzle-view.component.html',
  styleUrls: ['./puzzle-view.component.css']
})
export class PuzzleViewComponent implements OnInit, OnDestroy {

  score: number = 0;
  showScore: boolean = false;
  subscription: Subscription;

  fetchdata$: Observable<any>;

  correctAnswer1: string;
  correctAnswer2: string;
  correctAnswer3: string;

  respond1: Quiz;
  respond2: Quiz;
  respond3: Quiz;

  dataForm = new FormGroup({
    getAnswer1: new FormControl(),
    getAnswer2: new FormControl(),
    getAnswer3: new FormControl(),
  });

  get getAnswer1() {
    return this.dataForm.get('getAnswer1');
  }

  get getAnswer2() {
    return this.dataForm.get('getAnswer2');
  }

  get getAnswer3() {
    return this.dataForm.get('getAnswer3');
  }

  constructor(
    private router: Router,
    private learningService: LearningService,
    private http: HttpClient,
    private dialog: MatDialog
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
}

  ngOnInit(): void {
    if (!this.learningService.queryParams) {
      this.router.navigate(['learning/menu']);
    } else {
      // this.fetchdata$ = this.learningService.fetchData();
      this.subscription = this.fetchdata$.subscribe((data) => {
        console.info('data:', data)
        this.correctAnswer1 = data[0].correctAnswer;
        this.correctAnswer2 = data[1].correctAnswer;
        this.correctAnswer3 = data[2].correctAnswer;
        this.respond1 = {
          question: data[0].question, answer1: data[0].correctAnswer, answer2: data[0].incorrectAnswer1,
          answer3: data[0].incorrectAnswer2, correctAnswer: data[0].correctAnswer
        };
        this.respond2 = {
          question: data[1].question, answer1: data[1].correctAnswer, answer2: data[1].incorrectAnswer1,
          answer3: data[1].incorrectAnswer2, correctAnswer: data[1].correctAnswer
        };
        this.respond3 = {
          question: data[2].question, answer1: data[2].correctAnswer, answer2: data[2].incorrectAnswer1,
          answer3: data[2].incorrectAnswer2, correctAnswer: data[2].correctAnswer
        };
      })
    }
  }

  confirm() {
    if(this.getAnswer1 && this.getAnswer2 && this.getAnswer3) {
      if (this.getAnswer1.value === this.correctAnswer1) {
        this.score += 50;
      }
      if (this.getAnswer2.value === this.correctAnswer2) {
        this.score += 50;
      }
      if (this.getAnswer3.value === this.correctAnswer3) {
        this.score += 50;
      }
      let dialogRef = this.dialog.open(ScoreDialogComponent, {
        data: { score: this.score }
      });
      dialogRef.afterClosed().subscribe((_) => {
        this.router.navigate(['/learning/menu']);
      });
    }
  }

}
