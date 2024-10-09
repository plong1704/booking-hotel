import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {HotelProfileService} from "../../../services/lease/hotel-profile.service";
import {RoomService} from "../../../services/lease/room.service";

import {HotelDescription} from "../description/description.component";


@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  _paymentList: payment[] = [];
  _channelManager: chanelManager[] = []


  getAll() {
    this._paymentList = [
      {
        id: 1,
        title: 'WEEKENDSALE',
        desc: 'Tuần lễ giảm giá cho tất cả khách hàng khi đặt phòng',
        isSelected: false
      },
      {
        id: 2,
        title: 'BLACKFRIDAY',
        desc: 'Ngày thứ 6 đen tối , giảm giá cho khách hàng đi đúng vào ngày thứ 6',
        isSelected: false
      },
      {
        id: 3,
        title: 'Khác',
        desc: 'Giảm giá theo dịch vụ của phòng',
        isSelected: false
      }
    ]
    this._channelManager = [
      {id: 1, name: "Có, tôi dùng", isSelected: false},
      {id: 2, name: "Không", isSelected: false},
    ]
  }

  rfPricing!: FormGroup;

  constructor(private formBuilder: FormBuilder, private hotelProfileService: HotelProfileService, private roomService: RoomService) {
  }

  dc!: Discount;
  ro!: {
    id: number, name: string;


    maxAdults: number;
    maxChildren: number;

    originPrice: number;
    rentalPrice: number;

    hotel: HotelDescription;

    discount:    Discount;
  };

  submitForm() {

    this.dc = this.rfPricing.value
    console.log(this.rfPricing.value)
    this.roomService.createDiscount(this.dc).subscribe(value => {
      this.roomService.discount = value;
      this.roomService.id_lock_discount=value.id;
      console.log(this.roomService.discount);


    });
    this.ro = {
      id: this.roomService.id_lock,
      name:this.roomService.room.name,
      maxAdults:this.roomService.room.maxAdults,
      maxChildren:this.roomService.room.maxChildren,
      originPrice:this.roomService.room.originPrice,
      rentalPrice:this.roomService.room.rentalPrice,
      hotel:this.roomService.room.hotel,
      discount:  this.roomService.discount

    }
    console.log(this.ro);
    this.roomService.updateRoomHotel(this.roomService.id_lock,this.ro).subscribe(value => {

      this.roomService.room=value;


    })


  }

  ngOnInit(): void {
    this.getAll();
    this.rfPricing = this.formBuilder.group({


      discountPercent: ['', Validators.required],
      name: ['', Validators.required],


    });
  }


}

export interface Discount {
  id: number;
  discountPercent: number;
  name: string;
}

class payment {
  id: number | undefined;
  title: string = '';
  desc: string = '';
  isSelected: boolean = false;
}

class chanelManager {
  id: number | undefined;
  name: string | undefined;
  isSelected: boolean = false;


}
