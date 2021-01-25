import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { InfoComponent } from 'src/app/snackbars/info/info.component';

@Component({
  selector: 'app-delete-account-dialog',
  templateUrl: './delete-account-dialog.component.html',
  styleUrls: ['./delete-account-dialog.component.scss']
})
export class DeleteAccountDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DeleteAccountDialogComponent>,
    private authService: AuthService, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close({});
  }

  deleteAccount() {
    this.authService.deleteAccount().subscribe(
      res => {
        console.log(res);
        if (res.ok) {
          this._snackbar.openFromComponent(InfoComponent, {
            data: {
              content: res.message
            }
          });
          this.authService.logout();
          this.dialogRef.close({});
        }
      }, err => {
        console.log(err);
      }
    );
  }

}
