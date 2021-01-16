import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.8s ease-out', style({ transform: 'translateX(0%)' }))
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

  constructor() { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.registrationForm.getRawValue());
  }

}
