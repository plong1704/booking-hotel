import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { PaymentMethodComponent } from './payment-method/payment-method.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: 'user-detail',
        component: UserDetailComponent,
      },
      {
        path: 'payment-method',
        component: PaymentMethodComponent,
      },
      {
        path: '',
        redirectTo: 'user-detail',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
