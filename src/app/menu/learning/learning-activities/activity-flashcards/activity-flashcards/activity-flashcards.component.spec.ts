import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFlashcardsComponent } from './activity-flashcards.component';

describe('ActivityFlashcardsComponent', () => {
  let component: ActivityFlashcardsComponent;
  let fixture: ComponentFixture<ActivityFlashcardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityFlashcardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityFlashcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
