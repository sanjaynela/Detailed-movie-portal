import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselGridShowComponent } from './carousel-grid-show.component';

describe('CarouselGridShowComponent', () => {
  let component: CarouselGridShowComponent;
  let fixture: ComponentFixture<CarouselGridShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselGridShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselGridShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
