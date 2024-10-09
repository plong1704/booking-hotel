import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PhotosRoutingModule } from './photos-routing.module';
import { PhotosComponent } from './photos.component';
import {MatIconModule} from "@angular/material/icon";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    PhotosComponent
  ],
    imports: [
        CommonModule,
        PhotosRoutingModule,
        MatIconModule,
        ReactiveFormsModule
    ]
})
export class PhotosModule { }
