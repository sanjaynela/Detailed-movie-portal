import { Component, OnInit, Input } from '@angular/core';

import { Movie } from '../../models/Movie';


@Component({
  selector: 'app-carousel-basic',
  templateUrl: './carousel-basic.component.html',
  styleUrls: ['./carousel-basic.component.css']
})
export class CarouselBasicComponent implements OnInit {
  @Input() images: Movie[];
  //images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor() {
    this.images = [];
  }

  ngOnInit(): void {
  }

}
