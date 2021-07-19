import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselGridMsComponentComponent } from './carousel-grid-ms-component.component';

describe('CarouselGridMsComponentComponent', () => {
  let component: CarouselGridMsComponentComponent;
  let fixture: ComponentFixture<CarouselGridMsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarouselGridMsComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselGridMsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
