import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WifiSvgComponent } from './wifi-svg.component';

describe('WifiSvgComponent', () => {
  let component: WifiSvgComponent;
  let fixture: ComponentFixture<WifiSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WifiSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WifiSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
