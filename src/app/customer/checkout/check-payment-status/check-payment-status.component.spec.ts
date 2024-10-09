import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPaymentStatusComponent } from './check-payment-status.component';

describe('CheckPaymentStatusComponent', () => {
  let component: CheckPaymentStatusComponent;
  let fixture: ComponentFixture<CheckPaymentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckPaymentStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckPaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
