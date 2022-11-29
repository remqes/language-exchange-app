import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../profile/profile-settings/user.service';

@Component({
  selector: 'app-score-dialog',
  templateUrl: './score-dialog.component.html',
  styleUrls: ['./score-dialog.component.css']
})
export class ScoreDialogComponent implements OnInit {
  userUID: string;
  userData: any;


  constructor(public dialogRef: MatDialogRef<ScoreDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService) { }

  cancel() {
    this.userService.updateScore({...this.userData}, this.data.score);
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.userService.currentUserProfile$.subscribe(userData => {
      this.userUID = userData?.uid !== undefined ? userData.uid : '';
      this.userData = userData;
    });
  }

}
