import { AuthService } from './../../auth/auth.service';
import { from, Observable, of, switchMap } from 'rxjs';
import { Injectable } from '@angular/core';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { User } from 'src/app/model/user.model';
import { updateDoc } from 'firebase/firestore';
import { Auth, authState } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser$ = authState(this.auth);

  constructor(private firestore: Firestore, private auth: Auth) { }

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

  addUser(user: User): Observable<void> {
    const reference = doc(this.firestore, 'users', user.uid);
    return from(setDoc(reference, user));
  }

  updateUser(user: User): Observable<void> {
    const reference = doc(this.firestore, 'users', user.uid);
    return from(updateDoc(reference, { ...user }));
  }
}
