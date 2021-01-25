import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { registrationData } from '../interfaces/registrationData.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public apiUrl = environment.apiUrl;
  private JWT_TOKEN = 'JWT_TOKEN';
  private REFRESH_TOKEN = 'REFRESH_TOKEN';

  constructor(private http: HttpClient, private router: Router) { }

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

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    this.router.navigate(['/welcome'])
  }

  refreshToken() {
    return this.http.post(`${this.apiUrl}/auth/refresh/`, {
      'refresh': this.getRefreshToken()
    }).pipe(
      tap((tokens: any) => {
        this.setJWTToken(tokens.access);
      }), catchError(err => {
        return throwError(err);
      })
    );
  }

  getUserData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/auth/user/`);
  }

  changePassword(formData): Observable<any> {
    return this.http.put(`${this.apiUrl}/auth/user/`, formData);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/auth/user/`);
  }
}
