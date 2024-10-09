import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationMakerSvgComponent } from './location-maker-svg.component';

describe('LocationMakerSvgComponent', () => {
  let component: LocationMakerSvgComponent;
  let fixture: ComponentFixture<LocationMakerSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationMakerSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocationMakerSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
