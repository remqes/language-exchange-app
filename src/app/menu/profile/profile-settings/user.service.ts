import { AuthService } from './../../auth/auth.service';
import { from, Observable, of, switchMap, concatMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { collectionData, doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { User } from 'src/app/model/user.model';
import { collection,  query, updateDoc } from 'firebase/firestore';
import firebase from 'firebase/compat/app';
import { Auth, authState, updateProfile, UserInfo } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser$ = authState(this.auth);

  constructor(private firestore: Firestore, private auth: Auth) {}

  get currentUserProfile$(): Observable<User | null> {
    return this.currentUser$
      .pipe(switchMap(user => {
        if (!user?.uid) {
          return of(null);
        }
        const reference = doc(this.firestore, 'users', user.uid);
        return docData(reference) as Observable<User>;
      }));
  }

  get users$(): Observable<User[]> {
    const reference = collection(this.firestore, 'users');
    const getAll = query(reference);
    return collectionData(getAll) as Observable<User[]>;
  }

  addUser(user: User): Observable<void> {
    const reference = doc(this.firestore, 'users', user.uid);
    return from(setDoc(reference, { uid: user.uid }));
  }

  updatePicture(profileData: Partial<UserInfo>): Observable<any> {
    const currentUser = this.auth.currentUser;
    return of(currentUser).pipe(
      concatMap((user) => {
        if (!user) throw new Error('Error');
        return updateProfile(user, profileData);
      })
    );
  }

  updateUser(user: User, userUID: string): Observable<void> {
    let score = user.score !== undefined ? user.score : 0;
    const reference = doc(this.firestore, 'users', userUID);
    return from(updateDoc(reference, { uid: userUID, bio: user.bio, name: user.name, profilePicturePath: user.profilePicturePath, score: score }));
  }

  updateScore(user: User, score: number) {
    const reference = doc(this.firestore, 'users', user.uid);
    let newScore = user.score !== undefined ? user.score + score : score;
    return from(updateDoc(reference, { uid: user.uid, bio: user.bio, name: user.name, profilePicturePath: user.profilePicturePath, score: newScore }));
  }
}
