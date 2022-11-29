import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityGapsComponent } from './activity-gaps.component';

describe('ActivityGapsComponent', () => {
  let component: ActivityGapsComponent;
  let fixture: ComponentFixture<ActivityGapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityGapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityGapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
