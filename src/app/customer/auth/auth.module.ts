import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { SvgAsTemplateModule } from 'src/app/shared/svg-as-template/svg-as-template.module';
import { CustomerRoutingModule } from '../customer-routing.module';
import { HttpClientModule } from '@angular/common/http';

// import { LoginRoutingModule } from './components/login/login-routing.module';
import { OtpValidationComponent } from './components/otp-validation/otp-validation.component';
import { ChangePasswordDialogComponent } from './components/change-password-dialog/change-password-dialog.component';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
const routes: Routes = [
 {path: 'register', component: SignUpComponent},
 {path: 'forget', component: ForgetPasswordComponent},
 {path: 'validate-otp/:type',
 component: OtpValidationComponent,}
]

@NgModule({
  declarations: [
    ForgetPasswordComponent,
    LoginComponent,
    SignUpComponent,
    ForgetPasswordComponent,
    SignUpComponent,
    OtpValidationComponent,
    ChangePasswordDialogComponent,
    MessageDialogComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    SvgAsTemplateModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forChild(routes),

  ],
  exports: [
    ForgetPasswordComponent,
    LoginComponent,
    SignUpComponent,
    OtpValidationComponent,
    ChangePasswordDialogComponent,
  ],
})
export class AuthModule {}
