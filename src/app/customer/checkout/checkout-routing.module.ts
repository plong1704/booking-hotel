import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout.component';
import { CheckPaymentStatusComponent } from './check-payment-status/check-payment-status.component';

const routes: Routes = [
  {
    path: "", component: CheckoutComponent,
  },
  {
    path: "payment/status", component: CheckPaymentStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckoutRoutingModule { }
