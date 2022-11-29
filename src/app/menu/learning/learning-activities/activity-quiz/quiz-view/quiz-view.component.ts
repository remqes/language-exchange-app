import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LearningService } from '../../../learning.service';
import { ENDPOINTURL } from 'src/app/environments/environment';
import arrayShuffle from 'array-shuffle';
import { Quiz } from 'src/app/shared/models/activities.model';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ScoreDialogComponent } from '../../../score-dialog/score-dialog.component';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './quiz-view.component.html',
  styleUrls: ['./quiz-view.component.css']
})
export class QuizViewComponent implements OnInit {
  score: number = 0;
  showScore: boolean = false;

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

  fetchdata$: Observable<any>;

  constructor(
    private router: Router,
    private learningService: LearningService,
    private http: HttpClient,
    private dialog: MatDialog) {
      this.dataForm.valueChanges.subscribe((data) => {
        console.info('data: ', data);
        console.info(this.getAnswer1?.value !== null, this.getAnswer2?.value !== null,
          this.getAnswer3?.value !== null)
      });
    }

  ngOnInit(): void {
    if (!this.learningService.queryParams) {
      this.router.navigate(['learning/menu']);
    } else {
      this.fetchdata$ = this.fetchData();
      this.fetchdata$.subscribe((data) => {
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
      });
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
      })
    }
  }

  fetchData() {
    const {selectedActivity, activityParameter, selectedLanguage, selectedCategory, selectedLevel } = this.learningService.queryParams;

    return this.http.get<any>(`http://${ENDPOINTURL}${selectedActivity}=${activityParameter}`+
      `&level=${selectedLevel}&category=${selectedCategory}`+
      `&language=${selectedLanguage}`);
  }
}
