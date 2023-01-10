import { MatInputModule } from '@angular/material/input';
import { ChatsRoutingModule } from './chats-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './chat-list/chat-list.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ShowDatePipe } from 'src/app/pipe/date.pipe';
import { DatePipe } from '@angular/common';
import { ScorePipe } from 'src/app/pipe/score.pipe';
import { ChatReportDialogComponent } from './chat-report-dialog/chat-report-dialog.component';

@NgModule({
  declarations: [
    ChatListComponent,
    ShowDatePipe,
    ChatReportDialogComponent,
  ],
  imports: [
    CommonModule,
    ChatsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
  ],
  providers: [ShowDatePipe, DatePipe]
})
export class ChatsModule { }
