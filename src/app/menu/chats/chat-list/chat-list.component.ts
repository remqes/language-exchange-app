import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ChatsModule } from './../chats.module';
import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  constructor(private chatsModule: ChatsModule, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    const userId = this.afAuth.currentUser;
    console.info('userid: ', userId);

    const test = firebase.auth().currentUser;
    console.info('test: ', test)
  }

}
