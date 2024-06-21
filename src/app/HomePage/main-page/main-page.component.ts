import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  banner = "/assets/images/welcome.png";
  youtubefront = "/assets/images/youtube_1.png";
  javaproject = "/assets/images/youtube_4.png";
  amcatseries = "/assets/images/youtube_5.png";
  cocubesseries = "/assets/images/youtube_6.png";
  allvideos = "/assets/images/youtube_2.png";
  instagram = "/assets/images/instagram_1.png";
  nobroker="/assets/images/NobrokerLogo.png";

  constructor() { }

  ngOnInit(): void {
  }

}
