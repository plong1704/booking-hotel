import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PricingRoutingModule } from './pricing-routing.module';
import { PricingComponent } from './pricing.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PricingComponent
  ],
    imports: [
        CommonModule,
        PricingRoutingModule,
        ReactiveFormsModule
    ]
})
export class PricingModule { }
