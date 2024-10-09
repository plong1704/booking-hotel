import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaseRoutingModule } from './lease-routing.module';
import { LeaseComponent } from './lease.component';
import {CreateModule} from "./create/create.module";
import {CustomerLayoutModule} from "../shared/layout/customer-layout/customer-layout.module";








@NgModule({
  declarations: [
    LeaseComponent,

  ],
  imports: [
    CommonModule,
    LeaseRoutingModule,
    CreateModule,
    CustomerLayoutModule,


  ]
})
export class LeaseModule { }
