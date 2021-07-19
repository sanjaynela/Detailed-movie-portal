import { Component, OnInit, Input } from '@angular/core';

import { Movie } from '../../models/Movie';


@Component({
  selector: 'app-carousel-grid',
  templateUrl: './carousel-grid.component.html',
  styleUrls: ['./carousel-grid.component.css']
})
export class CarouselGridComponent implements OnInit {
  @Input() images: Movie[];

  constructor() {
    this.images = [];
   }

  ngOnInit(): void {
  }

}
