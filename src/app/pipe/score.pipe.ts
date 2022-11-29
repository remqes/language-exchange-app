import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'score'
})
export class ScorePipe implements PipeTransform {

  transform(value: number | undefined): number {
    return value !== undefined ? value : 0;
  }

}
