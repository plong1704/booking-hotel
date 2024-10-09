import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadioAtomComponent } from './radio-atom.component';

describe('RadioAtomComponent', () => {
  let component: RadioAtomComponent;
  let fixture: ComponentFixture<RadioAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadioAtomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RadioAtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
