import { Component, OnInit, Input } from '@angular/core';

import { Show } from '../../models/Show';

@Component({
  selector: 'app-carousel-grid-show',
  templateUrl: './carousel-grid-show.component.html',
  styleUrls: ['./carousel-grid-show.component.css']
})
export class CarouselGridShowComponent implements OnInit {
  @Input() showsImages: Show[];

  constructor() {
    this.showsImages = [];
  }

  ngOnInit(): void {
  }

}
