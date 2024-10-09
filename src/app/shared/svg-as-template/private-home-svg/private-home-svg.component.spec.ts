import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateHomeSvgComponent } from './private-home-svg.component';

describe('PrivateHomeSvgComponent', () => {
  let component: PrivateHomeSvgComponent;
  let fixture: ComponentFixture<PrivateHomeSvgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateHomeSvgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateHomeSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
