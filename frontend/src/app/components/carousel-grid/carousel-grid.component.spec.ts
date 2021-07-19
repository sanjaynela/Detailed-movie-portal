import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselGridComponent } from './carousel-grid.component';

describe('CarouselGridComponent', () => {
  let component: CarouselGridComponent;
  let fixture: ComponentFixture<CarouselGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
