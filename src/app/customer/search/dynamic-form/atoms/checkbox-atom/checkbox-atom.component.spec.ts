import { ComponentFixture, TestBed } from '@angular/core/testing';

import CheckboxAtomComponent from './checkbox-atom.component';

describe('CheckboxAtomComponent', () => {
  let component: CheckboxAtomComponent;
  let fixture: ComponentFixture<CheckboxAtomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxAtomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxAtomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
