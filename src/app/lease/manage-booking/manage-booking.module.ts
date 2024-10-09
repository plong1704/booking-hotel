import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageBookingRoutingModule } from './manage-booking-routing.module';
import { ManageBookingComponent } from './manage-booking.component';
import {MatTableModule} from "@angular/material/table";


@NgModule({
  declarations: [
    ManageBookingComponent
  ],
    imports: [
        CommonModule,
        ManageBookingRoutingModule,
        MatTableModule
    ]
})
export class ManageBookingModule { }
