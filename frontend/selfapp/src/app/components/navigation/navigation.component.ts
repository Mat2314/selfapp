import { ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerContent, MatSidenavContainer } from '@angular/material/sidenav';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { ImageService } from 'src/app/services/image.service';
import { ScrollService } from 'src/app/services/scroll.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  faBars = faBars;
  showFiller = false;
  public username: string;
  public profilePictureURL: string;

  constructor(private authService: AuthService, private scrollService: ScrollService, private imageService: ImageService) { }

  @ViewChild(MatDrawer, { static: true }) drawer: MatDrawer;
  @ViewChild(MatDrawerContent, { static: true }) drawerContent: MatDrawerContent;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    var width = event.target.innerWidth;
    if (width < 750) {
      this.drawer.close();
    } else {
      this.drawer.open();
    }
  }

  ngOnInit(): void {
    this.drawerContent.elementScrolled().subscribe(event => {
      var fromBottom = this.drawerContent.measureScrollOffset("bottom");
      this.scrollService.setValue(fromBottom);
    });

    this.getUserData();
  }

  logout() {
    this.authService.logout();
  }

  getUserData() {
    this.authService.getUserData().subscribe(
      res => {
        console.log(res);
        this.username = res.name;
        if (res.profile_image) {
          this.profilePictureURL = environment.apiUrl + "/pictures" + res.profile_image;
        }
      }, err => {
        console.log(err);
      }
    );
  }

  onFileChange(files: FileList) {
    var photo = files[0];

    this.imageService.uploadProfilePicture(photo).subscribe(
      res => {
        console.log(res);
        if (res.ok) {
          this.getUserData();
        }
      }, err => {
        console.log(err);
      }
    );


  }

}
