import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faInstagram, faTwitter, faLinkedin, faSnapchat } from "@fortawesome/free-brands-svg-icons";
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from 'src/app/dialog/login-dialog/login-dialog.component';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  faChevronCircleRight = faChevronCircleRight;
  faFacebook = faFacebook;
  faInstagram = faInstagram;
  faTwitter = faTwitter;
  faLinkedin = faLinkedin;
  faSnapchat = faSnapchat;

  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  });

  public contactForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    message: new FormControl(null, [Validators.required])
  });

  constructor(public dialog: MatDialog, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {});
    dialogRef.afterClosed().subscribe(result => { });
  }

  goToRegistration() {
    this.router.navigate(['/registration']);
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.getRawValue()).subscribe(
        res => {
          console.log(res);
          if (res.access && res.refresh) {
            this.authService.setTokens(res);
            this.router.navigate(['/nav/dashboard']);
          }
        }, err => {
          // console.log(err);
        }, () => {
          this.loginForm.reset();
        }
      );
    }
  }

}
