import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { URL_API } from 'src/app/models/constance';
import {
  APIResponse,
  AutocompleteSearchResponse,
  HotelFacilityGroup,
} from 'src/app/models/response';

@Injectable({
  providedIn: 'root',
})
export class FacilityService {
  constructor(private _httpClient: HttpClient) {}

  public findAllByHotel(hotelId: number): Observable<HotelFacilityGroup[]> {
    let url = URL_API.concat(`/api/facility/hotel/${hotelId}`);
    return this._httpClient.get<HotelFacilityGroup[]>(url, {
      responseType: 'json',
    });
  }
}
