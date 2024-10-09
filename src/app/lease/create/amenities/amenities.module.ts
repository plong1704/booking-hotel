import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AmenitiesRoutingModule } from './amenities-routing.module';
import { AmenitiesComponent } from './amenities.component';


@NgModule({
  declarations: [
    AmenitiesComponent
  ],
  imports: [
    CommonModule,
    AmenitiesRoutingModule
  ]
})
export class AmenitiesModule { }
