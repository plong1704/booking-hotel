import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  {
    path: '',
    component: CustomerComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then((m) => m.CartModule)
      },
      {
        path: "checkout",
        loadChildren: () => import('./checkout/checkout.module').then((m) => m.CheckoutModule)
      },
      { path: 'search', loadChildren: () => import('./search/search.module').then(m => m.SearchModule) },
      {
        path: "favorite-list",
        loadChildren: () => import('./favorite-list/favorite-list.module').then((m) => m.FavoriteListModule)
      },
      {
        path: "product/:hotel-name/:type",
        component: ProductDetailComponent,
      },
      { path: 'auth',  loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
      { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerRoutingModule { }
