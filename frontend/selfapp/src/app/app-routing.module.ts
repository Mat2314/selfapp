import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { SettingsComponent } from './components/settings/settings.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { WelcomeComponent } from './components/welcome/welcome.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  {
    path: 'nav', component: NavigationComponent, children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-photo', component: AddPhotoComponent },
      { path: 'timeline', component: TimelineComponent },
      { path: 'settings', component: SettingsComponent },
    ]
  },
  { path: 'registration', component: RegistrationComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
