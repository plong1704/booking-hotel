import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {HotelProfileService} from "../../services/lease/hotel-profile.service";
import {HotelProfile} from "../../models/model";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  constructor( private hotelProfileService: HotelProfileService) { }
  hotelProfile:HotelProfile[]=[];
  dataSource!:MatTableDataSource<HotelProfile>;
  ngOnInit(): void {
    // this.hotelProfileService.getAllHotelProfiles().subscribe(value => {
    // this.hotelProfile=value;
    // console.log(this.hotelProfile);
    // console.log('----------')
    //   this.dataSource = new MatTableDataSource<HotelProfile>(this.hotelProfile);
    // console.log(this.dataSource)
    //   this.dataSource.paginator = this.paginator;
    // })
  }
  displayedColumns: string[] = ['businessPremises', 'status','code','size','address','star',
  'way','price','payment','cancelPolicy','add'];


  @ViewChild(MatPaginator) paginator!: MatPaginator ;




}
// export interface PeriodicElement {
//
//
//   businessPremises :string;
//   status:string;
//   code:string;
//   size:string;
//   address:string;
//
//   star:string;
//   way:string;
//   price:number;
//
//   payment:string;
//
//   cancelPolicy:string;
//   add:string;
//
// }


