import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerContent, MatSidenavContainer } from '@angular/material/sidenav';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/services/auth.service';
import { ScrollService } from 'src/app/services/scroll.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  faBars = faBars;
  showFiller = false;

  constructor(private authService: AuthService, private scrollService: ScrollService) { }

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
  }

  logout() {
    this.authService.logout();
  }

}
