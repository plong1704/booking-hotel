import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarFilterComponent } from './nav-bar-filter.component';

describe('NavBarFilterComponent', () => {
  let component: NavBarFilterComponent;
  let fixture: ComponentFixture<NavBarFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
