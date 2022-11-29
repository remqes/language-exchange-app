import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPuzzleComponent } from './activity-puzzle.component';

describe('ActivityPuzzleComponent', () => {
  let component: ActivityPuzzleComponent;
  let fixture: ComponentFixture<ActivityPuzzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityPuzzleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
