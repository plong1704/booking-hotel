import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ADD_ALL_RESERVATION, ADD_RESERVATION } from 'src/app/models/constance';
import { ReservationRequest } from 'src/app/models/model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
    params: {},
  };
  constructor(private httpClient: HttpClient) { }

  saveReservation(request: ReservationRequest) {
    this.httpOptions.params = {
      request
    };
    return this.httpClient.post(`${ADD_RESERVATION}`, this.httpOptions);
  }

  saveAllReservation(request: ReservationRequest[]) {
    return this.httpClient.post(`${ADD_ALL_RESERVATION}`, request);
  }
}
