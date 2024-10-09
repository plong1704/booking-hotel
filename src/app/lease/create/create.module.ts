import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { CreateComponent } from './create.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    CreateComponent
  ],
  exports: [
    CreateComponent
  ],
    imports: [
        CommonModule,
        CreateRoutingModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,


    ]
})
export class CreateModule { }
