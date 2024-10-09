import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldBuilderComponent } from './field-builder/field-builder.component';
import { AtomsModule } from './atoms/atoms.module';



@NgModule({
  declarations: [
    FieldBuilderComponent
  ],
  imports: [
    CommonModule,
    AtomsModule
  ],
  exports: [
    FieldBuilderComponent
    
   ]
})
export class DynamicFormModule { }
