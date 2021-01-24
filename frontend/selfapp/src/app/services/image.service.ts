import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  uploadImage(image: File, date: string, caption: string = ""): Observable<any> {
    let formData = new FormData();
    formData.append('picture', image);
    formData.append('date', date);
    formData.append('caption', caption);

    return this.http.post(`${this.apiUrl}/pictures/upload/`, formData);
  }

  getTimelineImages(page: number): Observable<any> {
    let httpParams = new HttpParams().set('page', page.toString());
    return this.http.get(`${this.apiUrl}/pictures/upload/`, { params: httpParams });
  }

}
