import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityQuizComponent } from './activity-quiz.component';

describe('ActivityQuizComponent', () => {
  let component: ActivityQuizComponent;
  let fixture: ComponentFixture<ActivityQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
