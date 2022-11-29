import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashcardsViewComponent } from './flashcards-view.component';

describe('FlashcardsViewComponent', () => {
  let component: FlashcardsViewComponent;
  let fixture: ComponentFixture<FlashcardsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlashcardsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashcardsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
