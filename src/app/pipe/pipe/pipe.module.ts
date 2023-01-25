import { ScorePipe } from 'src/app/pipe/score.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ScorePipe,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ScorePipe
  ],
})
export class PipeModule { }
