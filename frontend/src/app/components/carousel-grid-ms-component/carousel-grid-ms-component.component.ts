import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-grid-ms-component',
  templateUrl: './carousel-grid-ms-component.component.html',
  styleUrls: ['./carousel-grid-ms-component.component.css']
})
export class CarouselGridMsComponentComponent implements OnInit {
  @Input() images: any[];

  constructor() {
    this.images = [];
  }

  ngOnInit(): void {
    console.log(this.images[0].type);
  }

}
