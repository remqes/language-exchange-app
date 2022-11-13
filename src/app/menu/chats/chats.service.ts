import { UserService } from './../profile/profile-settings/user.service';
import { User } from './../../model/user.model';
import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { concatMap, Observable, take, map } from 'rxjs';
import { addDoc, collection, doc, query, Timestamp, where, updateDoc, orderBy } from 'firebase/firestore';
import { ChatWindow, Message } from 'src/app/model/message.model';
import firebase from 'firebase/compat/app';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatsService {
  userUID: string;

  get chatsList$(): Observable<ChatWindow[]> {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.userUID = user.uid;
      } else {
        console.error('not logged')
      }});

    const reference = collection(this.firestore, 'chatChannels');
    return this.userService.currentUserProfile$.pipe(concatMap((user) => {
        const get = query(reference, where('userIds', 'array-contains', this.userUID));
        return collectionData(get, { idField: 'id' }).pipe(
          map((chat) => this.chatTile(this.userUID ?? '', chat as ChatWindow[]))
        ) as Observable<ChatWindow[]>
      }));
  }

  catchMessages$(chatId: string): Observable<Message[]> {
    const reference = collection(this.firestore, 'chatChannels', chatId, 'messages');
    const get = query(reference, orderBy('time', 'asc'));
    return collectionData(get) as Observable<Message[]>;
  }

  constructor(private firestore: Firestore, private userService: UserService, private aFirestore: AngularFirestore) { }

  addMessage(chatId: string, message: string, id: string): Observable<any> {
    const reference = collection(this.firestore, 'chatChannels', chatId, 'messages');
    const chatReference = doc(this.firestore, 'chatChannels', chatId);
    const sendTime = Timestamp.fromDate(new Date());
    return this.userService.currentUserProfile$.pipe(
      take(1), concatMap((user) => addDoc(reference, {
        senderId: id,
        text: message,
        time: sendTime,
      }))
    );
  }

  test(uid: string) {
    return (this.aFirestore.firestore.doc(`users/${uid}`).get())
  }

  chatTile(id: string, chatsList: ChatWindow[]): ChatWindow[] {
    chatsList.forEach((chat) => {
      const index = chat.userIds.indexOf(id ?? '') === 0 ? 1 : 0; //kto wysyłał wiadomość
      const uid = chat.userIds[index];
      chat.name = uid; //TODO: zmiana uid na name przy pobieraniu fieldów z dokumentu oraz dodanie obrazka tak samo
    });
    return chatsList;
  }

  isChatExist(partner: string): Observable<string | null> {
    return this.chatsList$.pipe(
      take(1), map(chat => {
        for (let i = 0; i < chat.length; i++)
          if (chat[i].userIds.includes(partner))
            return chat[i].id;
        return null;
      })
    );
  }

  startChat(partner: User): Observable<string> {
    const reference = collection(this.firestore, 'chatChannels');
    return this.userService.currentUserProfile$.pipe(
      take(1), concatMap((user) => addDoc(reference, { userIds: [user?.uid, partner?.uid], users: [
        { name: user?.name ?? ''}, //TODO: photo do dodania
        { name: partner.name ?? ''},
      ]})),
      map(reference => reference.id)
    );
  }
}
