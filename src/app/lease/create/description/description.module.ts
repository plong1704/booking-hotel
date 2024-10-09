import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DescriptionRoutingModule } from './description-routing.module';
import { DescriptionComponent } from './description.component';
import {ReactiveFormsModule} from "@angular/forms";
import { CustomerComponent } from 'src/app/customer/customer.component';


@NgModule({
  declarations: [
    DescriptionComponent
  ],
    imports: [
        CommonModule,
        DescriptionRoutingModule,
        ReactiveFormsModule
    ]
})
export class DescriptionModule { }

describe('CustomerComponent', () => {
  let component: CustomerComponent;
  let fixture: ComponentFixture<CustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
