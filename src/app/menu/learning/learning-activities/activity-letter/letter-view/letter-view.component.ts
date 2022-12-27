import { LearningService } from './../../../learning.service';
import { Component, OnInit } from '@angular/core';
import { map, Observable, Subscription } from 'rxjs';
import arrayShuffle from 'array-shuffle';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export interface Unscramble {
  name: string;
  image: string;
}

@Component({
  selector: 'app-letter-view',
  templateUrl: './letter-view.component.html',
  styleUrls: ['./letter-view.component.css']
})
export class LetterViewComponent implements OnInit {

  fetchData$: Observable<Unscramble[]>;
  fetchData: Subscription;
  actualIndex: number = 0;
  saveToArray: Subscription;
  nameArray: Array<string>;
  wordArray: Array<string>;
  answerWord: Array<string>;
  mixedWord: string;
  displayedWord: string;
  isWrong: boolean = false;
  score: number = 0;


  constructor(private learningService: LearningService) { }

  checkAnswer() {
    this.mixedWord = this.answerWord.join("");
    console.info(this.wordArray, this.mixedWord, this.answerWord)
    if(this.mixedWord === this.nameArray[this.actualIndex]) {
      this.moveNext();
      this.score += 20;
    } else {
      this.isWrong = true;
    }
  }

  ngOnInit(): void {
    this.fetchData$ = this.learningService.fetchData();
    this.fetchData = this.fetchData$.pipe(map(data => data.map(data => data.name))).subscribe(data => console.info(data))
    this.saveToArray = this.fetchData$.pipe(map(data => data.map(data => data.name))).subscribe(data => {
      this.nameArray = data;
      console.info('wykonanie')
      this.randomWords();
    });
  }

  moveNext() {
    if (this.actualIndex !== 9) {
      this.actualIndex++;
      this.isWrong = false;
      this.randomWords();
    }
  }

  randomWords() {
    this.wordArray = this.nameArray[this.actualIndex].split("");
    this.wordArray = arrayShuffle(this.wordArray);
    this.displayedWord = this.wordArray.join("");
    this.answerWord = this.wordArray;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}

//20pkt za kazde
