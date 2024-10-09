import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoriteListRoutingModule } from './favorite-list-routing.module';
import { FavoriteListComponent } from './favorite-list.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FavoriteHotelService } from '../services/favorite-hotel.service';


@NgModule({
  declarations: [FavoriteListComponent],
  imports: [
    CommonModule,
    FavoriteListRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    FavoriteHotelService
  ]
})
export class FavoriteListModule { }
