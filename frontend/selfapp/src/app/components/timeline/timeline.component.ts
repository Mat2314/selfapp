import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { Photo } from 'src/app/interfaces/displayed-photo.interface';
import { ImageService } from 'src/app/services/image.service';
import { ScrollService } from 'src/app/services/scroll.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [
        style({ opacity: 0.2, height: '0' }),
        animate('2s 0.5s ease-out', style({ opacity: 1, height: '40vh' }))
      ]),
    ]),

    trigger('fadeInRight', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(50%)' }),
        animate('1s linear', style({ opacity: 1, transform: 'translateX(0%)' }))
      ]),
    ]),

    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50%)' }),
        animate('1s 1s linear', style({ opacity: 1, transform: 'translateY(0%)' }))
      ])
    ])
  ]
})
export class TimelineComponent implements OnInit {

  public apiUrl = environment.apiUrl;
  public photos: Array<Photo> = [];
  public currentPage: number = 1;
  public lastPage: number = 10;
  public loadingResponse: boolean = false;
  public scrollFromBottom: number;

  constructor(private scrollService: ScrollService, private imageService: ImageService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.getPhotos();

    this.scrollService.getValue().subscribe((value) => {
      this.scrollFromBottom = value;
      if (this.scrollFromBottom < 50) {
        // Download another pictures
        this.getPhotos();
        this.changeDetector.detectChanges();
      }
    });
  }

  getPhotos() {
    if (this.currentPage < this.lastPage + 1 && !this.loadingResponse) {

      // Prevent multiple server requests
      this.loadingResponse = true;

      // Download images data
      this.imageService.getTimelineImages(this.currentPage).subscribe(
        res => {
          // console.log(res);
          this.lastPage = res.lastPage;
          if (res.images) {
            // Add images to array
            res.images.forEach((element: Photo) => {
              element.image = this.apiUrl + "/pictures/" + element.image;
              this.photos.push(element);
            });
            console.log(this.photos);
          }
        }, err => {
          // console.log(err);
        }, () => {
          // Increment the page and let the other request be made
          this.currentPage++;
          this.loadingResponse = false;
        }
      );
    }
  }
}
