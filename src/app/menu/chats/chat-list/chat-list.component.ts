import { User } from './../../../model/user.model';
import { UserService } from './../../profile/profile-settings/user.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, concatMap, first, map, of, startWith, switchMap, tap } from 'rxjs';
import { ChatsService } from '../chats.service';
import firebase from 'firebase/compat/app';
import { Firestore } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

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
  userData: Array<User> = [];
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

  constructor(
    private userService: UserService,
    private firestore: AngularFirestore,
    private chatService: ChatsService,
    private storage: AngularFireStorage
    ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userUID = user.uid;
      } else {
        console.error('not logged')
      }});

      // this.chats$.pipe(
    // map(data => data.map(data => data.userIds.filter(data => data !== this.userUID))))
      //   .subscribe(data => {
      //     const usersId = data.flat();
      //     usersId.forEach(id => {
      //       this.userData.push(this.firestore.collection('users').doc(id).get())
      //     });
      //     console.info()
      //   });
    this.chats$.pipe(
      map(data => data.map(data => data.userIds.filter(data => data !== this.userUID))), //[['id1'], ['id2'], ['id3']]
      concatMap(data => data.flat()), //'id1', 'id2', 'id3'
      concatMap(id => this.firestore.collection('users').doc(id).ref.get())
    ).subscribe( async (userData) => {
      let pictureURL: string;
      await this.storage.ref(`${userData.get('profilePicturePath')}`).getDownloadURL().subscribe(url => {
        this.userData.push({
          uid: userData.get('uid'),
          name: userData.get('name'),
          bio: userData.get('bio'),
          profilePicturePath: url,
          score: userData.get('score'),
        });
      });


    });
        //TODO: to zwraca tablice z id userów, pobrac dane z tych id, następnie
        // stworzyc to samo co w partners-list, czyli pobranie obrazów
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
    if (message && chatId) {
      this.chatService.addMessage(chatId, message, this.userUID).subscribe(() => {
        this.scrollBottom();
      });
      this.sendMessageControl.setValue('');
    }
  }

  startChat(user: User) {
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
