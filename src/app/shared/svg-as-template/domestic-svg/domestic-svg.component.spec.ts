import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DomesticSvgComponent } from './domestic-svg.component';

describe('DomesticSvgComponent', () => {
  let component: DomesticSvgComponent;
  let fixture: ComponentFixture<DomesticSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DomesticSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DomesticSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
