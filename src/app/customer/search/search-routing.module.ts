import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SearchComponent } from './search.component';

const routes: Routes = [{
  path: '', component: SearchComponent, children: [
    {
      path: 'products', component: ProductListComponent
    },

    {
      path: '', redirectTo: 'products', pathMatch: 'full'
    },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
