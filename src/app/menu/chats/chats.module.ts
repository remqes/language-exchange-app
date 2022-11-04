import { ChatsRoutingModule } from './chats-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './chat-list/chat-list.component';

@NgModule({
  declarations: [
    ChatListComponent,
  ],
  imports: [
    CommonModule,
    ChatsRoutingModule,
  ]
})
export class ChatsModule { }
