import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, share } from 'rxjs';
import { ENDPOINTURL } from 'src/app/environments/environment';
import { Flashcard } from './learning-activities/activity-flashcards/flashcards-view/flashcards-view.component';

@Injectable({
  providedIn: 'root'
})
export class LearningService {

  queryParams: any;

  constructor(private http: HttpClient) { }

  fetchData() {
    const {selectedActivity, activityParameter, selectedLanguage, selectedCategory, selectedLevel } = this.queryParams;

    return this.http.get<any>(`http://${ENDPOINTURL}${selectedActivity}=${activityParameter}`+
      `&level=${selectedLevel}&category=${selectedCategory}`+
      `&language=${selectedLanguage}`).pipe(share());
  }
}
