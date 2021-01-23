import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  public apiUrl = environment.apiUrl + '/pictures/media/images/Racool_9wF2TLN.png';

  constructor() {
  }

  ngOnInit(): void {
  }

}
