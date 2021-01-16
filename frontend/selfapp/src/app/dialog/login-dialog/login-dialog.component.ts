import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  faTimes = faTimes;
  
  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>) { }

  onClose(): void {
    this.dialogRef.close({});
  }

  ngOnInit(): void {

  }

}
