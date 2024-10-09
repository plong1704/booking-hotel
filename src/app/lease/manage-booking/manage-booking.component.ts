import { Component, OnInit } from '@angular/core';
import {HotelProfileService} from "../../services/lease/hotel-profile.service";
import {HotelProfile} from "../../models/model";
import {MatTableDataSource} from "@angular/material/table";
import {HotelDescription} from "../create/description/description.component";
import {RoomService} from "../../services/lease/room.service";
import {Rating} from "../review-customer/review-customer.component";

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

  constructor( private roomService: RoomService) { }
  re:Reservation[]=[];
   dataSource!:MatTableDataSource<Reservation>;
  // dataSource!:Reservation[];
  displayedColumns: string[] = ['Ngày Tạo','Ngày chỉnh sửa' ,'Số lượng người lớn','Số lượng trẻ em','Giảm %','Giá','Trạng thái','Khách sạn','Phòng','Bởi'
   ];



  ngOnInit(): void {
    this.roomService.getAllReservations().subscribe(value => {
      this.re=value;
      console.log('----------')
      this.dataSource = new MatTableDataSource<Reservation>(this.re);
      console.log(this.dataSource)
    })
  }

}
export interface Reservation {

  createdDate: string;
  modifiedDate: string;
  adult: number;
  children: number;

  discountPercent:number;
  price: number;
  status:boolean;
  hotelId:number;
  roomId:number;
  username:string;

}
