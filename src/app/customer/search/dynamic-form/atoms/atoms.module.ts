import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import CheckboxAtomComponent from './checkbox-atom/checkbox-atom.component';
import { RadioAtomComponent } from './radio-atom/radio-atom.component';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CheckboxAtomComponent,
    RadioAtomComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
     CheckboxAtomComponent,
     RadioAtomComponent
   ]
})
export class AtomsModule { }
