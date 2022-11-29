import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityMemoComponent } from './activity-memo.component';

describe('ActivityMemoComponent', () => {
  let component: ActivityMemoComponent;
  let fixture: ComponentFixture<ActivityMemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityMemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityMemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
