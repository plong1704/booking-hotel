import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";
import {HotelAddress} from "../../lease/create/description/description.component";

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private baseUrl = "http://localhost:8080/api/address/";

  constructor(private httpClient: HttpClient) {
  }
  id_lock: number = 1;
  hotelAddress!:HotelAddress;
  createAddress(address: HotelAddress): Observable<HotelAddress> {
    return this.httpClient.post<HotelAddress>(`${this.baseUrl}address`, address);
  }
}
