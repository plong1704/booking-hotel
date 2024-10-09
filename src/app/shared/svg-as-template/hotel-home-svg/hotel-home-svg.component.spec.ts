import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelHomeSvgComponent } from './hotel-home-svg.component';

describe('HotelHomeSvgComponent', () => {
  let component: HotelHomeSvgComponent;
  let fixture: ComponentFixture<HotelHomeSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelHomeSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HotelHomeSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
