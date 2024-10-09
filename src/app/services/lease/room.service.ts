import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoomHotel} from "../../lease/create/basic/basic.component";
import {HotelAddress, HotelDescription} from "../../lease/create/description/description.component";
import {Discount} from "../../lease/create/pricing/pricing.component";
import {Reservation} from "../../lease/manage-booking/manage-booking.component";
import {Rating} from "../../lease/review-customer/review-customer.component";


@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private baseUrl = "http://localhost:8080/api/room/";
  constructor(private httpClient: HttpClient) {
  }
  room!:RoomHotel;
  id_lock: number = 1;
  getAllRoomHotels(): Observable<RoomHotel[]> {
    return this.httpClient.get<RoomHotel[]>(`${this.baseUrl}rooms`);
  }

  createRoomHotel(roomHotel: RoomHotel): Observable<RoomHotel> {
    return this.httpClient.post<RoomHotel>(`${this.baseUrl}room`, roomHotel);
  }

  updateRoomHotel(id: number, roomHotel: { rentalPrice: number; name: string; hotel: HotelDescription; id: number; maxAdults: number; originPrice: number; maxChildren: number }): Observable<RoomHotel> {
    return this.httpClient.put<RoomHotel>(`${this.baseUrl}rooms/${id}`, roomHotel);
  }

  deleteRoomHotel(id: number): Observable<RoomHotel> {
    return this.httpClient.delete<RoomHotel>(`${this.baseUrl}hotel_profiles/${id}`);

  }
  discount!:Discount;
  id_lock_discount=1;
  createDiscount(discount: Discount): Observable<Discount> {
    return this.httpClient.post<Discount>('http://localhost:8080/api/discount/discount', discount);
  }
  getAllReservations(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(`http://localhost:8080/api/reservations/getAllReservations`);
  }

}
