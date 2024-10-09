import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LocationRoutingModule } from './location-routing.module';
import { LocationComponent } from './location.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LocationComponent
  ],
    imports: [
        CommonModule,
        LocationRoutingModule,
        ReactiveFormsModule
    ]
})
export class LocationModule { }
