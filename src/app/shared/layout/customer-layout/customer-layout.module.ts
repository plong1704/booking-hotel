import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerHeaderComponent } from './customer-header/customer-header.component';
import { CustomerFooterComponent } from './customer-footer/customer-footer.component';
import { AngularMaterialModule } from '../../angular-material/angular-material.module';
import { SvgAsTemplateModule } from '../../svg-as-template/svg-as-template.module';
import { RouterModule } from '@angular/router';
import { CustomerRoutingModule } from 'src/app/customer/customer-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthModule } from 'src/app/customer/auth/auth.module';

@NgModule({
  declarations: [CustomerHeaderComponent, CustomerFooterComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    SvgAsTemplateModule,
    RouterModule,
    CustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AuthModule
  ],
  exports: [CustomerHeaderComponent, CustomerFooterComponent],
})
export class CustomerLayoutModule { }
``