import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { URL_API } from 'src/app/models/constance';
import { ApiResponse } from 'src/app/models/model';
import { ProductFilterRequest } from 'src/app/models/request';
import { APIResponse, AutocompleteSearchResponse, ProductDetailResponse } from 'src/app/models/response';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private _httpClient: HttpClient) { }

  public autocompleteSearch(search: string): Observable<APIResponse<AutocompleteSearchResponse[]>>{
    let url = URL_API.concat(`/api/hotel/autocomplete-search/${search}`);
    return this._httpClient.get<APIResponse<AutocompleteSearchResponse[]>>(url, {
      responseType: "json"
    })
  }

  public getAutocompleteSearch(search: string): Observable<AutocompleteSearchResponse[]>{
    return this.autocompleteSearch(search).pipe(
      switchMap(response => {
        return of(response.data)
      })
    )
  }
  public findDetailHotel(hotelId: number, productFilterRequest: ProductFilterRequest): Observable<ProductDetailResponse>{
    productFilterRequest.value = hotelId
    let url = URL_API.concat(`/api/hotel/${hotelId}`);
    return this._httpClient.post<ProductDetailResponse>(
      url,
      productFilterRequest,
      {
        responseType: 'json',
      }
    );
  }

}
