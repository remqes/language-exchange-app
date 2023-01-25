import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';

@Component({
  selector: 'app-chat-report-dialog',
  templateUrl: './chat-report-dialog.component.html',
  styleUrls: ['./chat-report-dialog.component.css']
})
export class ChatReportDialogComponent implements OnInit {
  reportedUsername: string;

  reportForm = new FormGroup({
    report: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  get report() {
    return this.reportForm.get('report');
  }

  constructor(private afirestore: AngularFirestore,
    public dialogRef: MatDialogRef<ChatReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  getUsername() {
    this.afirestore.collection('users').doc(this.data.reportedUserId).valueChanges().pipe(
      map((user: any) => this.reportedUsername = user ? user.name : '')
    ).subscribe();
  }

  add() {
    if (this.report?.value) {
      const feedback = this.report.value;
      const uid = this.data.userId;
      const reportedUser = this.data.reportedUserId;
      this.afirestore.collection('feedbacks').add({ feedback, uid, reportedUser });
      this.dialogRef.close();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}

//todo: dokończyć formularz reportowania i system dostawania powiadomień, następnie dokończyć video i chyba tyle, ewentualnie obsługa błędów przy logowaniu i rejestracji, a
//potem to wszystko opisać :3
