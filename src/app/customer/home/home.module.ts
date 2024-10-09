import { FilterBarModule } from './../../shared/layout/customer-layout/filter-bar/filter-bar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { SvgAsTemplateModule } from 'src/app/shared/svg-as-template/svg-as-template.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FilterProductService } from '../services/filter-product.service';
import { ProgressSpinnerService } from '../services/progress-spinner.service';


@NgModule({
  declarations: [
    HomeComponent,
    HomeBannerComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AngularMaterialModule,
    SvgAsTemplateModule,
    FormsModule,
    ReactiveFormsModule,
    FilterBarModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [ProgressSpinnerService]
})
export class HomeModule { }
