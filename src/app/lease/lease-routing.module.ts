import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LeaseComponent} from './lease.component';


const routes: Routes = [
  {
    path: '',
    component: LeaseComponent,
    children: [
      {path: 'create', loadChildren: () => import('./create/create.module').then(m => m.CreateModule)},
      {path: 'manage', loadChildren: () => import('./manage/manage.module').then(m => m.ManageModule)},
      {
        path: 'manage-booking',
        loadChildren: () => import('./manage-booking/manage-booking.module').then(m => m.ManageBookingModule)
      },
      {
        path: 'review-customer',
        loadChildren: () => import('./review-customer/review-customer.module').then(m => m.ReviewCustomerModule)
      },

    ],
  },


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaseRoutingModule {
}
