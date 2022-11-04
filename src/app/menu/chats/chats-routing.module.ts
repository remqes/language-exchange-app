import { ChatListComponent } from './chat-list/chat-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'chat-list',
    component: ChatListComponent,
  },
  {
    path: '',
    redirectTo: 'chat-list',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatsRoutingModule { }
