import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReviewCustomerRoutingModule } from './review-customer-routing.module';
import { ReviewCustomerComponent } from './review-customer.component';
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    ReviewCustomerComponent
  ],
  imports: [
    CommonModule,
    ReviewCustomerRoutingModule,
    MatTableModule
  ]
})
export class ReviewCustomerModule { }
