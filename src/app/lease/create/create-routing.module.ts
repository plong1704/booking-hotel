import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateComponent} from './create.component';
import {BasicComponent} from "./basic/basic.component";

const routes: Routes = [{path: '', component: CreateComponent, children: [
    {path: 'basic', loadChildren: () => import('./basic/basic.module').then(m => m.BasicModule)},
    {path: 'location', loadChildren: () => import('./location/location.module').then(m => m.LocationModule)},
    { path: 'description', loadChildren: () => import('./description/description.module').then(m => m.DescriptionModule) },
    { path: 'amenities', loadChildren: () => import('./amenities/amenities.module').then(m => m.AmenitiesModule) },
    { path: 'pricing', loadChildren: () => import('./pricing/pricing.module').then(m => m.PricingModule) },
    { path: 'photos', loadChildren: () => import('./photos/photos.module').then(m => m.PhotosModule) },
    { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },

    {path: '', redirectTo:'basic',pathMatch:'full'}
  ]},









];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule {
}
