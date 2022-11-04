import { EventTypes } from './../models/toast-event.model';
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Toast } from 'bootstrap';
import { fromEvent, take  } from 'rxjs';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  @Output() disposeEvent = new EventEmitter();

  @ViewChild('toastElement', { static: true })
  toastElement: ElementRef;

  @Input()
  type: string;

  @Input()
  title: string;

  @Input()
  message: string;

  toast: Toast;

  constructor() { }

  hide() {
    this.toast.dispose();
    this.disposeEvent.emit();
  }

  ngOnInit(): void {
    this.show();
  }

  show() {
    this.toast = new Toast(
      this.toastElement.nativeElement, this.type === EventTypes.Error ? {
        autohide: false,
      } : {
        delay: 5000,
      }
    );
    fromEvent(this.toastElement.nativeElement, 'hidden.bs.toast')
      .pipe(take(1))
      .subscribe(() => this.hide());
    this.toast.show();
  }

}
