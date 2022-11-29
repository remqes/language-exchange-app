import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LearningService } from 'src/app/menu/learning/learning.service';
import { Language, Category, Level } from 'src/app/shared/models/categories.model';

@Component({
  selector: 'app-choose-level',
  templateUrl: './choose-level.component.html',
  styleUrls: ['./choose-level.component.css']
})
export class ChooseLevelComponent implements OnInit {
  @Input() selectedActivity: string;
  @Input() activityParameter: string;

  selectedLanguage: string;
  selectedCategory: string;
  selectedLevel: string;

  languages: Language[] = [
    { value: 'polish', name: 'Polish', availability: true },
    { value: 'english', name: 'English', availability: true },
  ];

  categories: Category[] = [
    { value: 'animals', name: 'Animals'},
    { value: 'house', name: 'House'},
    { value: 'nature', name: 'Nature'},
    { value: 'technology', name: 'Technology'},
    { value: 'transport', name: 'Transport'},
    { value: 'other', name: 'Other'},
  ];

  levels: Level[] = [
    { value: 'easy', name: 'Easy'},
    { value: 'hard', name: 'Hard'},
  ];

  constructor(private router: Router, private learningService: LearningService) { }

  confirm() {
    this.learningService.queryParams = { selectedActivity: this.selectedActivity, activityParameter: this.activityParameter,
      selectedLanguage: this.selectedLanguage, selectedCategory: this.selectedCategory, selectedLevel: this.selectedLevel };
    switch (this.activityParameter) {
      case 'quiz':
        this.router.navigate(['/learning/menu/quiz/exercise']);
        break;
      case 'flashcards':
        this.router.navigate(['/learning/menu/flashcards/exercise']);
        break;
      case 'fill-in-blanks':
        this.router.navigate(['/learning/menu/fill-in-blanks/exercise']);
        break;
      case 'unscramble':
        this.router.navigate(['/learning/menu/unscramble/exercise']);
        break;
      case 'memorygame':
        this.router.navigate(['/learning/menu/memorygame/exercise']);
        break;
      case 'puzzles':
        this.router.navigate(['/learning/menu/puzzles/exercise']);
        break;
    }
  }

  ngOnInit(): void { }

}
