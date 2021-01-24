import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { AlertModule } from "ngx-bootstrap/alert";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoginDialogComponent } from './dialog/login-dialog/login-dialog.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from "@angular/material/snack-bar";
import { InfoComponent } from './snackbars/info/info.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { InterceptedSrcDirective } from './directives/intercepted-src.directive';
import '@angular/common/locales/global/pl'


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginDialogComponent,
    RegistrationComponent,
    InfoComponent,
    DashboardComponent,
    NavigationComponent,
    AddPhotoComponent,
    TimelineComponent,
    SettingsComponent,
    InterceptedSrcDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarouselModule.forRoot(),
    AlertModule.forRoot(),
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [
    Location, { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 5000, horizontalPosition: 'right', verticalPosition: 'top' } },
    { provide: LOCALE_ID, useValue: "pl" },
  ],
  bootstrap: [AppComponent],
  exports: [CarouselModule, AlertModule]
})
export class AppModule { }
