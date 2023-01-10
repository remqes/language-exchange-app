import { ChatsService } from './../chats.service';
import { ChatWindow } from 'src/app/model/message.model';
import { User } from './../../../model/user.model';
import { UserService } from './../../profile/profile-settings/user.service';
import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { combineLatest, map, of, startWith, Subscription, switchMap, tap } from 'rxjs';
import firebase from 'firebase/compat/app';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { ChatReportDialogComponent } from '../chat-report-dialog/chat-report-dialog.component';

interface ChatList {
  chatId: string;
  toReadBy: string;
  userId: string;
  name: string;
  bio: string;
  picturePath?: string;
}

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnDestroy, OnInit {
  @ViewChild('chatEnd') chatEnd: ElementRef;
  chatHeaderControl = new FormControl('');
  sendMessageControl = new FormControl('');
  searchControl = new FormControl('');
  userUID: string;
  chatData: Array<ChatList> = [];
  chatWindow: Array<ChatWindow> = [];
  chats$ = this.chatService.chatsList$;
  chat: Subscription;
  chatIndex: number = 0;
  receiveMessage: boolean = false;
  feedback: string;
  secondUID: string;
  toReadByValue: string = '';

  choosedChat$ = combineLatest([this.chatHeaderControl.valueChanges, this.chats$]).pipe(
    map(([value, chats]) => chats.find(chat => chat.id === value[0])), //wybrany chat
    tap(() => {
      setTimeout(() => {
        this.receiveMessage = false;
      }, 5000);
    })
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

    chatTxt: Array<ChatList> = [];
  router: any;

  constructor(
    private userService: UserService,
    private firestore: AngularFirestore,
    private chatService: ChatsService,
    private storage: AngularFireStorage,
    private dialog: MatDialog
    ) { }

    ngOnDestroy(): void {
        // this.chat.unsubscribe();
    }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userUID = user.uid;
      } else {
        console.error('not logged')
      }});

    this.chats$ = this.chats$.pipe(
      map(data => {
        const idsArray = data.map(data => data.userIds.filter(data => data !== this.userUID)).flat();
        this.secondUID = idsArray[0];
        idsArray.forEach(id => {
          let match: boolean = false;
          let index = 0;
          while (!match && index < idsArray.length) {
            if (idsArray[index] === id) {
              match = !match;
              this.firestore.collection('users').doc(id).ref.get().then(reference => {
                this.storage.ref(`${reference.get('profilePicturePath')}`).getDownloadURL().subscribe(image => {
                  if (image) {
                    data[index].picture = image;
                  }
                });
              });
            } else {
              index++;
            }
          }
          data.map(data => this.toReadByValue = data.toReadBy!)
          if (this.userUID === this.toReadByValue) {
            this.receiveMessage = true;

          }
        });
        this.chatIndex = 0;
        return data;
      })
    );

    this.choosedChat$ = this.choosedChat$.pipe(
      map(data => {
        if (data) {
          const idsArray = data.userIds.filter(data => data !== this.userUID);
          this.firestore.collection('users').doc(idsArray[0]).ref.get().then(reference => {
            this.storage.ref(`${reference.get('profilePicturePath')}`).getDownloadURL().subscribe(image => {
              if (image) {
                data.picture = image;
              }
            });
          });
        }
        return data;
      })
    )
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

  report() {
    let dialogRef = this.dialog.open(ChatReportDialogComponent,
      { data: { userId: this.userUID, reportedUserId: this.secondUID } });
    dialogRef.afterClosed().subscribe((_) => {
      this.router.navigate(['/learning/chats']);
    });
  }

}
