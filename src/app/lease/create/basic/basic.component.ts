import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {
  Amenities,
  Amenity,
  Basic,
  Description,
  HotelProfile,
  Location,
  Photos,
  Pricing,
  Profile
} from "../../../models/model";
import {RoomService} from "../../../services/lease/room.service";
import {HotelDescription} from "../description/description.component";
import {Discount} from "../pricing/pricing.component";

@Component({
  selector: 'app-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {
  maxAdults = 0;

  plusAdult() {
    this.maxAdults = this.maxAdults + 1;
  }

  minusAdult() {
    if (this.maxAdults != 0) {
      this.maxAdults = this.maxAdults - 1;
    }
  }

  maxChildren = 0;

  plusChildren() {
    this.maxChildren = this.maxChildren + 1;
  }

  minusChildren() {
    if (this.maxChildren != 0) {
      this.maxChildren = this.maxChildren - 1;
    }
  }

  numBedroom = 0;

  plusBedroom() {
    this.numBedroom = this.numBedroom + 1;
  }

  minusBedroom() {
    if (this.numBedroom != 0) {
      this.numBedroom = this.numBedroom - 1;
    }
  }

  numberRoomOne = 0;

  plusRoomOne() {
    this.numberRoomOne = this.numberRoomOne + 1;
  }

  minusRoomOne() {
    if (this.numberRoomOne != 0) {
      this.numberRoomOne = this.numberRoomOne - 1;
    }
  }

  numberCommon = 0;

  plusCommon() {
    this.numberCommon = this.numberCommon + 1;
  }

  minusCommon() {
    if (this.numberCommon != 0) {
      this.numberCommon = this.numberCommon - 1;
    }
  }





  changValueComparisonBusiness(name: string) {


    this.rfBasic.controls['typeComparisionBusiness'].setValue(name)

  }

  rfBasic!: FormGroup;

  constructor(private formBuilder: FormBuilder, private roomService: RoomService) {
  }

  defaultTypeRoomOne: string = 'Giường đơn';
  defaultTypeCommon: string = 'Giường đơn';
  displayError: boolean = false;


  basic!: Basic;
  id_lock!:number;
  ngOnInit(): void {



    this.rfBasic = this.formBuilder.group({
      name: ['', Validators.required],


      maxAdults: ['', Validators.required],
      maxChildren: ['', Validators.required],

      originPrice:['', Validators.required],
      rentalPrice:['', Validators.required],


    });

  }


  submitted = false;

 room!:RoomHotel;



  onSubmit() {
    this.submitted = true;





    this.room= this.rfBasic.value;





    this.roomService.createRoomHotel(this.room).subscribe(value => {
      this.roomService.room=value;
      console.log(this.roomService.room)
      this.roomService.id_lock=value.id;
      console.log(this.roomService.id_lock);


    })
  }
}

export class RoomHotel {
  id: number =0;
  name: string ='';


  maxAdults: number =0;
  maxChildren: number =0;

  originPrice: number =0;
  rentalPrice: number =0;

  hotel!:HotelDescription;

  discount!: Discount;
}

