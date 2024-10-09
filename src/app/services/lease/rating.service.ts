import { Injectable } from '@angular/core';
import {HotelAddress, HotelDescription} from "../../lease/create/description/description.component";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Rating} from "../../lease/review-customer/review-customer.component";

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private baseUrl = "http://localhost:8080/api/user-rating/";



  id_lock: number = 1;

  rating!:Rating;


  constructor(private httpClient: HttpClient) {
  }

  getAllRating(): Observable<Rating[]> {
    return this.httpClient.get<Rating[]>(`${this.baseUrl}user-ratings`);
  }


}
