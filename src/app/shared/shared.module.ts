import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from '@angular/material/button';
import { ToastComponent } from './toast/toast.component';
import { ToasterComponent } from './toaster/toaster.component';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';

@NgModule({
  declarations: [
    NotFoundComponent,
    ToastComponent,
    ToasterComponent,
    ReportDialogComponent,
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SharedModule { }
