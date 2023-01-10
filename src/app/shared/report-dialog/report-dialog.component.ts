import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.css']
})
export class ReportDialogComponent implements OnInit {

  reportForm = new FormGroup({
    report: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  get report() {
    return this.reportForm.get('report');
  }

  constructor(private afirestore: AngularFirestore,
    public dialogRef: MatDialogRef<ReportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  add() {
    if (this.report?.value) {
      const feedback = this.report.value;
      const uid = this.data.userId;
      this.afirestore.collection('feedbacks').add({ feedback, uid });
      this.dialogRef.close();
    }
  }

  cancel() {
    this.dialogRef.close();
  }

}
