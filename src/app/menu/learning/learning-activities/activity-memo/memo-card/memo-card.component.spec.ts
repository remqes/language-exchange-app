import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemoCardComponent } from './memo-card.component';

describe('MemoCardComponent', () => {
  let component: MemoCardComponent;
  let fixture: ComponentFixture<MemoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
