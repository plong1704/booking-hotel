import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { RouterModule } from '@angular/router';
import { CustomerRoutingModule } from '../customer-routing.module';
import { FilterBarModule } from 'src/app/shared/layout/customer-layout/filter-bar/filter-bar.module';
import { ProductImageComponent } from './components/product-image/product-image.component';
import { RoomItemComponent } from './components/room-item/room-item.component';
import { SvgAsTemplateModule } from 'src/app/shared/svg-as-template/svg-as-template.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductImageComponent,
    RoomItemComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    CustomerRoutingModule,
    FilterBarModule,
    SvgAsTemplateModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductDetailModule { }
