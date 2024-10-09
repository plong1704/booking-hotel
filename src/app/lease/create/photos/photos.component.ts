import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HotelProfileService} from "../../../services/lease/hotel-profile.service";
import {HotelProfile} from "../../../models/model";
import {HotelDescription, HotelImage} from "../description/description.component";
import {HotelImageService} from "../../../services/lease/hotel-image.service";
import {RoomService} from "../../../services/lease/room.service";
import {RoomHotel} from "../basic/basic.component";
import {Discount} from "../pricing/pricing.component";

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  rfPhotos!: FormGroup;

  constructor(private formBuilder: FormBuilder, private hotelProfileService: HotelProfileService,
              private hotelImageService: HotelImageService,private  roomService :RoomService) {
  }

  hi!: HotelImage;
  rh!:{ rentalPrice: number; name: string; hotel: HotelDescription; id: number; maxAdults: number; originPrice: number; maxChildren: number ,
    discount: Discount;}
  submitForm() {



    this.hi = {
      id: 0,
      isThumbnail: true,
      url: this.rfPhotos.controls['url'].value.split('\\')[2],

      hotel: this.hotelProfileService.hotelDescription


    };
    console.log(this.hi)
    this.hotelImageService.createAddress(this.hi).subscribe(value => {
    console.log(value)
    })
    this.rh={
      id: this.roomService.id_lock,
      name:this.roomService.room.name,
      maxChildren:this.roomService.room.maxChildren,
      maxAdults:this.roomService.room.maxAdults,
      rentalPrice:this.roomService.room.rentalPrice,
      originPrice:this.roomService.room.originPrice,
      discount:this.roomService.discount,

      hotel:this.hotelProfileService.hotelDescription
    }
    this.roomService.updateRoomHotel(this.roomService.id_lock,this.rh).subscribe(value => {
      this.roomService.room= value;
      console.log(this.roomService.room)

      console.log("hehe")


    })

  }

  show: boolean = false;

  ngOnInit(): void {

    this.rfPhotos = this.formBuilder.group({


      url: ['', Validators.required],


    });
  }

  urls: string[] = [];
  url: string = '';

  onSelect(event: any) {
    this.show = true;
    // if (event.target.files && event.target.files[0]) {
    //   var filesAmount = event.target.files.length;
    //   for (let i = 0; i < filesAmount; i++) {
    //     var reader = new FileReader();
    //
    //     reader.onload = (event: any) => {
    //
    //       this.urls.push(event.target.result);
    //
    //       this.rfPhotos.patchValue({
    //         fileSource: this.urls
    //       });
    //     }
    //
    //     reader.readAsDataURL(event.target.files[i]);
    //   }
    // }
    if (event.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
    }
  }
}
