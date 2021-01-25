import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatInkBar } from '@angular/material/tabs';
import { DeleteAccountDialogComponent } from 'src/app/dialog/delete-account-dialog/delete-account-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { InfoComponent } from 'src/app/snackbars/info/info.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public changePasswordForm: FormGroup = new FormGroup({
    old_password: new FormControl(null, Validators.required),
    new_password: new FormControl(null, Validators.required),
    new_password_repeat: new FormControl(null, Validators.required)
  });

  constructor(private authService: AuthService, private _snackbar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  changePassword() {
    this.authService.changePassword(this.changePasswordForm.getRawValue()).subscribe(
      res => {
        console.log(res);
        if (res.ok) {
          this.changePasswordForm.reset();
        }
        this._snackbar.openFromComponent(InfoComponent, {
          data: {
            content: res.message
          }
        });
      }, err => {
        console.log(err);
      }
    );
  }


  deleteAccount() {
    this.dialog.open(DeleteAccountDialogComponent, {});
  }
}
