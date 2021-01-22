import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  faBars = faBars;
  showFiller = false;

  constructor() { }

  @ViewChild(MatDrawer, { static: true }) drawer: MatDrawer;

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
  }

}
