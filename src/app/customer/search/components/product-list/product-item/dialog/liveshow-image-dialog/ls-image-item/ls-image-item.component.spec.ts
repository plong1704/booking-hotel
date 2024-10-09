import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LsImageItemComponent } from './ls-image-item.component';

describe('LsImageItemComponent', () => {
  let component: LsImageItemComponent;
  let fixture: ComponentFixture<LsImageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LsImageItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LsImageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
