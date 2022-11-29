import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GapsViewComponent } from './gaps-view.component';

describe('GapsViewComponent', () => {
  let component: GapsViewComponent;
  let fixture: ComponentFixture<GapsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GapsViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GapsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
