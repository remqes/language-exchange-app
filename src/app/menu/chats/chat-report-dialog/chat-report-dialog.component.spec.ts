import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatReportDialogComponent } from './chat-report-dialog.component';

describe('ChatReportDialogComponent', () => {
  let component: ChatReportDialogComponent;
  let fixture: ComponentFixture<ChatReportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatReportDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatReportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
