import { HttpClient } from '@angular/common/http';
import { Directive, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
  selector: '[interceptedSrc]'
})
export class InterceptedSrcDirective {

  public imageToShow: any;
  @Input('interceptedSrc') src: string;

  constructor(public el: ElementRef, private http: HttpClient) {
  }

  ngOnInit() {
    this.getAndDisplayImage();
  }

  getImageFromUrl(): Observable<Blob> {
    return this.http.get(this.src, { responseType: 'blob' });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageToShow = reader.result;
      this.el.nativeElement.src = this.imageToShow;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  getAndDisplayImage() {
    this.getImageFromUrl().subscribe(data => {
      this.createImageFromBlob(data);
    }, error => {
      // console.log(error);
    });
  }



}
