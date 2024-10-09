import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {HotelProfileService} from "../../../services/lease/hotel-profile.service";
import {HotelProfile} from "../../../models/model";

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss']
})
export class AmenitiesComponent implements OnInit {

  _amenitiesList: amenities[] = [];

  getAll() {
    this._amenitiesList = [
      {id: 1, name: 'Ăn uống', isSelected: false},
      {id: 2, name: 'Dễ dàng tiếp cận', isSelected: false},
      {id: 3, name: 'Thư giãn & Vui chơi giải trí', isSelected: false},
      {id: 4, name: 'Dịch vụ tiện nghi', isSelected: false},
      {id: 5, name: 'Đi lại', isSelected: false},
      {id: 6, name: 'Độ sạch sẽ và an toàn', isSelected: false},
      {id: 7, name: 'Dành cho trẻ em', isSelected: false},

    ]

  }

  onCheckboxChange(e: any) {
    const checkArray: FormArray = this.rfAmenities.get('recomendation') as FormArray;
    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.name))
    } else {
      var i = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.name) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });

    }

  }

  rfAmenities!: FormGroup;

  constructor(private formBuilder: FormBuilder, private hotelProfileService: HotelProfileService) {
  }

  hp!: HotelProfile;

  submitForm() {

    console.log(this.rfAmenities.value)


  }

  ngOnInit(): void {
    this.getAll();
    this.rfAmenities = this.formBuilder.group({
      recomendation: this.formBuilder.array([]),


    });
  }


}

class amenities {
  id: number | undefined;
  name: string | undefined;
  isSelected: boolean = false;


}
