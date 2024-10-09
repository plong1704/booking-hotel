import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ADD_TO_CART, DELETE_BY_IDS, GET_CART_ITEM_BY_SESSION_ROOM_ID } from 'src/app/models/constance';
import { DELETE_ITEM_FROM_CART, GET_CART_BY_SESSION_ID } from 'src/app/models/constance';
import { ApiResponse, CartItem } from 'src/app/models/model';
import { AddToCartRequest, FindCartItemRequest } from 'src/app/models/request';
import { AddToCartResponse } from 'src/app/models/response';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
    }),
    params: {},
  };
  constructor(private httpClient: HttpClient) { }

  addItemToCart(item: AddToCartRequest): Observable<AddToCartResponse> {
    return this.httpClient.post<AddToCartResponse>(`${ADD_TO_CART}`, item);
  }

  getCartItemsBySessionId(sessionId: string): Observable<CartItem[]> {
    return this.httpClient.get<CartItem[]>(`${GET_CART_BY_SESSION_ID}/${sessionId}`, this.httpOptions);
  }

  getCartItemDetails(data: FindCartItemRequest): Observable<CartItem> {
    return this.httpClient.post<CartItem>(`${GET_CART_ITEM_BY_SESSION_ROOM_ID}`, data);
  }

  deleteItemFromCart(id: number): Observable<ApiResponse> {
    this.httpOptions.params = {
      id: id
    };
    return this.httpClient.delete<ApiResponse>(`${DELETE_ITEM_FROM_CART}`, this.httpOptions);
  }

  deleteItemsFromCart(ids: number[]): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`${DELETE_BY_IDS}`, ids);
  }
}
