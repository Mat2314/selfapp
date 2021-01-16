import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { registrationData } from 'src/app/interfaces/registrationData.interface';
import { AuthService } from 'src/app/services/auth.service';
import { InfoComponent } from 'src/app/snackbars/info/info.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('1s ease-out', style({ transform: 'translateX(0%)' }))
      ]),
    ]),

    trigger('simpleFadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s ease-in', style({ opacity: 1 }))
      ]),
    ])
  ]
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, Validators.required),
    last_name: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required),
    repeat_password: new FormControl(null, Validators.required),
  });

  constructor(private authService: AuthService, private _snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  register() {
    this.registrationForm.addControl('username', new FormControl(this.registrationForm.controls.email.value));
    let registration_data: registrationData = this.registrationForm.getRawValue();
    this.authService.registerUser(registration_data).subscribe(
      res => {
        // console.log(res);
        this._snackbar.openFromComponent(InfoComponent, {
          data: {
            content: res.message
          }
        });
        if (res.ok) {
          this.router.navigate(['/']);
        }
      }, err => {
        // console.log(err);
        this._snackbar.openFromComponent(InfoComponent, {
          data: {
            content: "Unexpected error occurred"
          }
        });
      }, () => {
        this.registrationForm.reset();
      }
    );
  }

}
