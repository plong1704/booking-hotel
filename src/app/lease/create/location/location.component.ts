import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HotelProfileService} from "../../../services/lease/hotel-profile.service";
import {BasicComponent} from "../basic/basic.component";
import {HotelProfile} from "../../../models/model";
import {HotelAddress, HotelDescription} from "../description/description.component";
import {AddressService} from "../../../services/lease/address.service";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  public countryData = [
    {country: 'Choose country',},
    {
      country: 'Viet Nam', city: [
        'Ha Noi',
        'Tp Hcm',
        'Da Nang'
      ]
    },
    {
      country: 'Thai land', city: [
        'Thai1',
        'thai2',
        'Da Nang'
      ]
    }
  ]
  public city: string[] = [];

  changeCountry(event: any) {
    const country = event.target.value;
    if (!country) return;
    this.city = this.countryData.find((data) => data.country === country)?.city || [];

  }

  rfLocation!:FormGroup;
  constructor(private formBuilder: FormBuilder,private addressService:AddressService) {
  }
  ha!:HotelAddress;
  hd!:HotelDescription;
  submitForm(){






  this.ha=this.rfLocation.value;



  this.addressService.createAddress(this.ha).subscribe(value => {
    this.addressService.id_lock=value.id;

    this.addressService.hotelAddress=value;
    console.log(this.addressService.id_lock)
    console.log(this.addressService.hotelAddress)
  })
  }
  ngOnInit(): void {
    this.rfLocation= this.formBuilder.group({

      street : ['',Validators.required],




    });
  }

}
