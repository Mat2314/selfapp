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

  public apiUrl = environment.apiUrl + '/pictures/media/images/Racool_9wF2TLN.png';
  public photos: Array<Photo> = [];
  public scrollFromBottom: number;

  constructor(private scrollService: ScrollService, private imageService: ImageService, private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.scrollService.getValue().subscribe((value) => {
      this.scrollFromBottom = value;
      if (this.scrollFromBottom < 50) {
        // Download another picture
        this.pushToPhotosArray();
        this.changeDetector.detectChanges();
      }
      // console.log("From bottom timeline:", this.scrollFromBottom);
    });

    this.pushToPhotosArray();
  }

  pushToPhotosArray() {
    var photo: Photo = {
      id: "123",
      url: this.apiUrl,
      date: new Date(2021, 1, 21, 10, 10, 10, 10),
      caption: 'This is my caption'
    }

    this.photos.push(photo);

    console.log(this.photos);
  }

}
