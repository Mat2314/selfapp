import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  uploadImage(image: File, date: Date, caption: string = ""): Observable<any> {
    let formData = new FormData();
    formData.append('picture', image);
    formData.append('date', date.toString());
    formData.append('caption', caption);

    return this.http.post(`${this.apiUrl}/pictures/upload/`, formData);
  }
}
