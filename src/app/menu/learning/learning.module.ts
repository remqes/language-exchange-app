import { LearningRoutingModule } from './learning-routing.module';
import { LearningMenuComponent } from './learning-menu/learning-menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LearningMenuComponent,
  ],
  imports: [
    CommonModule,
    LearningRoutingModule,
  ]
})
export class LearningModule { }
