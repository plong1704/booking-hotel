import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationComponent } from './location.component';
import {BasicComponent} from "../basic/basic.component";
import {DescriptionComponent} from "../description/description.component";

const routes: Routes = [{ path: '', component: LocationComponent },
 ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }
