import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReviewCustomerComponent } from './review-customer.component';

const routes: Routes = [{ path: '', component: ReviewCustomerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewCustomerRoutingModule { }
