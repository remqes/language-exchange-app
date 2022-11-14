import { User } from './../../../model/user.model';
import { UserService } from './../../profile/profile-settings/user.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, of, startWith, switchMap, tap } from 'rxjs';
import { ChatsService } from '../chats.service';
import firebase from 'firebase/compat/app';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  @ViewChild('chatEnd') chatEnd: ElementRef;
  chatHeaderControl = new FormControl('');
  sendMessageControl = new FormControl('');
  searchControl = new FormControl('');
  userUID: string;
  chats$ = this.chatService.chatsList$;
  choosedChat$ = combineLatest([this.chatHeaderControl.valueChanges, this.chats$]).pipe(
    map(([value, chats]) => chats.find(chat => chat.id === value[0])) //wybrany chat
  );
  getMessages$ = this.chatHeaderControl.valueChanges.pipe(
    map(value => value[0]),
    switchMap(chatId => this.chatService.catchMessages$(chatId)),
    tap(() => {
      this.scrollBottom();
    })
  );
  user$ = this.userService.currentUserProfile$;
  users$ = combineLatest([this.userService.users$, this.user$, this.searchControl.valueChanges.pipe(startWith(''))]).pipe(
      map(([ allUsers, currentUser, searchedUser ]) => allUsers.filter((user) =>
                user.name?.toLowerCase().includes(searchedUser.toLowerCase()) && user.uid !== currentUser?.uid))
    );

  constructor(private userService: UserService, private chatService: ChatsService) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userUID = user.uid;
      } else {
        console.error('not logged')
      }});
  }

  scrollBottom() {
    setTimeout(() => {
      if (this.chatEnd)
      this.chatEnd.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  send() {
    const message = this.sendMessageControl.value;
    const chatId = this.chatHeaderControl.value[0];
    console.info(message, chatId)
    if (message && chatId) {
      this.chatService.addMessage(chatId, message, this.userUID).subscribe(() => {
        this.scrollBottom();
      });
      this.sendMessageControl.setValue('');
    }
  }

  startChat(user: User) {
    console.info('user: ', user)
    this.chatService.isChatExist(user.uid).pipe(
      switchMap(id => {
        if (id) {
          return of(id);
        } else {
          return this.chatService.startChat(user);
        }
      })
    ).subscribe((id) => {
      this.chatHeaderControl.setValue([id]);
    });
  }

}
