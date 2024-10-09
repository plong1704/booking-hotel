import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {HotelAddress, HotelDescription} from "../../lease/create/description/description.component";

@Injectable({
  providedIn: 'root'
})
export class HotelProfileService {


  private baseUrl = "http://localhost:8080/api/hotel/";



  id_lock: number = 1;

  hotelDescription!:HotelDescription;
  hotelAddress!:HotelAddress;

  constructor(private httpClient: HttpClient) {
  }

  getAllHotelDescriptions(): Observable<HotelDescription[]> {
    return this.httpClient.get<HotelDescription[]>(`${this.baseUrl}hotel_profiles`);
  }

  createHotelDescription(hotelDescription: HotelDescription): Observable<HotelDescription> {
    return this.httpClient.post<HotelDescription>(`${this.baseUrl}hotel_profile`, hotelDescription);
  }

  updateHotelDescription(id: number, hotelDescription: HotelDescription): Observable<HotelDescription> {
    return this.httpClient.put<HotelDescription>(`${this.baseUrl}hotel_profiles/${id}`, hotelDescription);
  }

  deleteHotelDescription(id: number): Observable<HotelDescription> {
    return this.httpClient.delete<HotelDescription>(`${this.baseUrl}hotel_profiles/${id}`);

  }
}
