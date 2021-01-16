import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { registrationData } from '../interfaces/registrationData.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  loginUser(formData): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/token/`, formData);
  }

  registerUser(formData: registrationData): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/registration/`, formData);
  }
}
