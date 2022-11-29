import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityLetterComponent } from './activity-letter.component';

describe('ActivityLetterComponent', () => {
  let component: ActivityLetterComponent;
  let fixture: ComponentFixture<ActivityLetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityLetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityLetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
