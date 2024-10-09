import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HotelProfileService} from "../../../services/lease/hotel-profile.service";
import {HotelProfile} from "../../../models/model";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  _homes: home[] = [];


  getAll() {
    this._homes = [
      {
        id: 1,
        title: 'Tôi làm chủ nhà cho chính tôi',
        desc: 'Chủ nhà tư nhân – bất kỳ bên nào đang cho thuê một chỗ nghỉ hoặc các chỗ nghỉ cho các mục đích ngoài thương mại, kinh doanh, hoặc nghề nghiệp của mình',
        isSelected: false
      },
      {
        id: 2,
        title: 'Tôi đại diện cho một công ty',
        desc: 'Chủ nhà chuyên nghiệp – bất kỳ bên nào đang cho thuê một chỗ nghỉ hoặc các chỗ nghỉ cho các mục đích liên quan đến thương mại, kinh doanh, hoặc nghề nghiệp của mình',
        isSelected: false
      }
    ]
  }

  value: number = 1;

  changeValue(event: any) {
    this.value = event;
    if (this.value == 1) {
      this.rfProfile.controls['company'].setValue({
          'nameCompany': '',
          'addressCompany': '',
          'codeAreaCompany': ''
        }
      )
    } else {
      this.rfProfile.controls['mySelf'].setValue({
        'firstName': '',
        'lastName': '',
        'date': ''
      })
    }

  }

  rfProfile!: FormGroup;

  constructor(private formBuilder: FormBuilder, private hotelProfileService: HotelProfileService) {
  }

  hp!: HotelProfile;

  submitForm() {

    console.log(this.rfProfile.value)




  }

  ngOnInit(): void {
    this.getAll();
    this.rfProfile = this.formBuilder.group({

      typeHost: ['', Validators.required],

      mySelf: this.formBuilder.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          date: ['', Validators.required]

        }
      ),
      company: this.formBuilder.group({
          nameCompany: ['', Validators.required],
          addressCompany: ['', Validators.required],
          codeAreaCompany: ['', Validators.required]

        }
      )

    });
  }

}

class home {
  id: number | undefined;
  title: string = '';
  desc: string = '';
  isSelected: boolean = false;
}
