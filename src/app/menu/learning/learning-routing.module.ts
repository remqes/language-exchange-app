import { PuzzleViewComponent } from './learning-activities/activity-puzzle/puzzle-view/puzzle-view.component';
import { MemoViewComponent } from './learning-activities/activity-memo/memo-view/memo-view.component';
import { LetterViewComponent } from './learning-activities/activity-letter/letter-view/letter-view.component';
import { GapsViewComponent } from './learning-activities/activity-gaps/gaps-view/gaps-view.component';
import { FlashcardsViewComponent } from './learning-activities/activity-flashcards/flashcards-view/flashcards-view.component';
import { QuizViewComponent } from './learning-activities/activity-quiz/quiz-view/quiz-view.component';
import { ActivityGapsComponent } from './learning-activities/activity-gaps/activity-gaps/activity-gaps.component';
import { ActivityLetterComponent } from './learning-activities/activity-letter/activity-letter/activity-letter.component';
import { ActivityFlashcardsComponent } from './learning-activities/activity-flashcards/activity-flashcards/activity-flashcards.component';
import { ActivityPuzzleComponent } from './learning-activities/activity-puzzle/activity-puzzle/activity-puzzle.component';
import { ActivityQuizComponent } from './learning-activities/activity-quiz/activity-quiz/activity-quiz.component';
import { ActivityMemoComponent } from './learning-activities/activity-memo/activity-memo/activity-memo.component';
import { ChooseLevelComponent } from './../../shared/choose-level/choose-level/choose-level.component';
import { LearningMenuComponent } from './learning-menu/learning-menu.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'menu',
    children: [
      {
        path: '',
        component: LearningMenuComponent,
      },
      {
        path: 'quiz',
        children: [
          {
            path: '',
            component: ActivityQuizComponent,
          },
          {
            path: 'exercise',
            component: QuizViewComponent,
          },
        ]
      },
      {
        path: 'flashcards',
        children: [
          {
            path: '',
            component: ActivityFlashcardsComponent
          },
          {
            path: 'exercise',
            component: FlashcardsViewComponent,
          },
        ],
      },
      {
        path: 'fill-in-blanks',
        children: [
          {
            path: '',
            component: ActivityGapsComponent
          },
          {
            path: 'exercise',
            component: GapsViewComponent,
          },
        ],
      },
      {
        path: 'unscramble',
        children: [
          {
            path: '',
            component: ActivityLetterComponent
          },
          {
            path: 'exercise',
            component: LetterViewComponent,
          },
        ],
      },
      {
        path: 'memorygame',
        children: [
          {
            path: '',
            component: ActivityMemoComponent
          },
          {
            path: 'exercise',
            component: MemoViewComponent,
          },
        ],
      },
      {
        path: 'puzzles',
        children: [
          {
            path: '',
            component: ActivityPuzzleComponent
          },
          {
            path: 'exercise',
            component: PuzzleViewComponent,
          },
        ],
      },
    ],
  },
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LearningRoutingModule { }
