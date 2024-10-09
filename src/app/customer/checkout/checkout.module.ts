import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { SvgAsTemplateModule } from 'src/app/shared/svg-as-template/svg-as-template.module';
import { PaymentService } from '../services/payment.service';
import { HttpClientModule } from '@angular/common/http';
import { CheckPaymentStatusComponent } from './check-payment-status/check-payment-status.component';
import { LoadingOverlayComponent } from './loading-overlay/loading-overlay.component';
import { ReservationService } from '../services/reservation.service';


@NgModule({
  declarations: [CheckoutComponent, CheckPaymentStatusComponent, LoadingOverlayComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    SvgAsTemplateModule,
    HttpClientModule
  ],
  providers: [
    PaymentService,
    ReservationService
  ]
})
export class CheckoutModule { }
