import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  faTimes = faTimes;

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>, private authService: AuthService) { }

  onClose(): void {
    this.dialogRef.close({});
  }

  ngOnInit(): void {

  }

  login() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.getRawValue()).subscribe(
        res => {
          console.log(res);
        }, err => {
          // console.log(err);
        }, () => {
          this.loginForm.reset();
        }
      );
    }
  }

}
