import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningMenuComponent } from './learning-menu.component';

describe('LearningMenuComponent', () => {
  let component: LearningMenuComponent;
  let fixture: ComponentFixture<LearningMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
