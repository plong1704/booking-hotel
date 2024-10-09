import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { HotelImage} from "../../lease/create/description/description.component";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HotelImageService {

  private baseUrl = "http://localhost:8080/api/hotel_image/";

  constructor(private httpClient: HttpClient) {
  }
  id_lock: number = 1;
  hotelImage!:HotelImage;
  createAddress(hotelImage: HotelImage): Observable<HotelImage> {
    return this.httpClient.post<HotelImage>(`${this.baseUrl}hotel_image`, hotelImage);
  }
}
