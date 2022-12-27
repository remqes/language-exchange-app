import { LearningRoutingModule } from './learning-routing.module';
import { LearningMenuComponent } from './learning-menu/learning-menu.component';
import { ChooseLevelComponent } from '../../shared/choose-level/choose-level/choose-level.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivityFlashcardsComponent } from './learning-activities/activity-flashcards/activity-flashcards/activity-flashcards.component';
import { ActivityGapsComponent } from './learning-activities/activity-gaps/activity-gaps/activity-gaps.component';
import { ActivityLetterComponent } from './learning-activities/activity-letter/activity-letter/activity-letter.component';
import { ActivityMemoComponent } from './learning-activities/activity-memo/activity-memo/activity-memo.component';
import { ActivityPuzzleComponent } from './learning-activities/activity-puzzle/activity-puzzle/activity-puzzle.component';
import { ActivityQuizComponent } from './learning-activities/activity-quiz/activity-quiz/activity-quiz.component';
import { GapsViewComponent } from './learning-activities/activity-gaps/gaps-view/gaps-view.component';
import { FlashcardsViewComponent } from './learning-activities/activity-flashcards/flashcards-view/flashcards-view.component';
import { LetterViewComponent } from './learning-activities/activity-letter/letter-view/letter-view.component';
import { PuzzleViewComponent } from './learning-activities/activity-puzzle/puzzle-view/puzzle-view.component';
import { MemoViewComponent } from './learning-activities/activity-memo/memo-view/memo-view.component';
import { QuizViewComponent } from './learning-activities/activity-quiz/quiz-view/quiz-view.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { ScoreDialogComponent } from './score-dialog/score-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MemoCardComponent } from './learning-activities/activity-memo/memo-card/memo-card.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    LearningMenuComponent,
    ChooseLevelComponent,
    ActivityFlashcardsComponent,
    ActivityGapsComponent,
    ActivityLetterComponent,
    ActivityMemoComponent,
    ActivityPuzzleComponent,
    ActivityQuizComponent,
    GapsViewComponent,
    FlashcardsViewComponent,
    LetterViewComponent,
    PuzzleViewComponent,
    MemoViewComponent,
    QuizViewComponent,
    ScoreDialogComponent,
    MemoCardComponent,
  ],
  imports: [
    CommonModule,
    LearningRoutingModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSortModule,
    DragDropModule,
    MatToolbarModule,
  ]
})
export class LearningModule { }
