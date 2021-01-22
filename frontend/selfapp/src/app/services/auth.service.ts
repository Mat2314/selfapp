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
  private JWT_TOKEN = 'JWT_TOKEN';
  private REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(private http: HttpClient) { }

  loginUser(formData): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/token/`, formData);
  }

  registerUser(formData: registrationData): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/registration/`, formData);
  }

  setJWTToken(token: string) {
    localStorage.setItem(this.JWT_TOKEN, token);
  }

  setRefreshToken(token: string) {
    localStorage.setItem(this.REFRESH_TOKEN, token);
  }

  getJWTToken() { return localStorage.getItem(this.JWT_TOKEN); }

  getRefreshToken() { return localStorage.getItem(this.REFRESH_TOKEN); }

  setTokens(tokens) {
    this.setJWTToken(tokens.access);
    this.setRefreshToken(tokens.refresh);
  }
}
