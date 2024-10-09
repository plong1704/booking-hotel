import { Component, OnInit } from '@angular/core';

import {RatingService} from "../../services/lease/rating.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-review-customer',
  templateUrl: './review-customer.component.html',
  styleUrls: ['./review-customer.component.scss']
})
export class ReviewCustomerComponent implements OnInit {

  constructor( private userRatingService: RatingService) { }
  userRating:Rating[]=[];
   dataSource!:MatTableDataSource<Rating>;

  displayedColumns: string[] = ['Nội dung','Sao' ,'Tiêu đề','Ngày','Khách sạn','Bởi'
  ];



  ngOnInit(): void {
      this.userRatingService.getAllRating().subscribe(value => {
         this.userRating=value;
         console.log(this.userRating);
        console.log('----------')
           this.dataSource = new MatTableDataSource<Rating>(this.userRating);
        console.log(this.dataSource)
        console.log('hehe')

      })

  }

}
export   interface  Rating{
  id:number;
  content:string;
  points:number;
  title:string;
  updateDate:string;
  hotelId:number;
  username:string;
}

