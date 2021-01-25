import { Component, OnInit } from '@angular/core';
import { ImageService } from 'src/app/services/image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public no_pictures: boolean = true;
  public photoURL: string;

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.getDashboardData();
  }

  getDashboardData() {
    this.imageService.getDashboardData().subscribe(
      res => {
        console.log(res);
        this.no_pictures = res.no_pictures;
        if (!res.no_pictures) {
          this.photoURL = environment.apiUrl + "/pictures/" + res.picture.image;
        }
      }, err => {
        console.log(err);
      }
    );
  }

}
