import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import {
  Observable,
  catchError,
  concatMap,
  filter,
  finalize,
  forkJoin,
  map,
  of,
  switchMap,
  tap,
  timeout,
} from 'rxjs';
import { FilterProductService } from 'src/app/customer/services/filter-product.service';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';
import {
  OptionFilterRequest,
  ProductFilterRequest,
} from 'src/app/models/request';
import {
  AddressResponse,
  AverageRatingResponse,
  DiscountResponse,
  SearchedProductItemResponse,
  SearchedProductResponse,
} from 'src/app/models/response';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  searchedProductResponse$!: Observable<SearchedProductResponse | null>;
  constructor(
    private _route: ActivatedRoute,
    private _productFilterService: FilterProductService,
    public progressSpinnerService: ProgressSpinnerService
  ) {}

  ngOnInit(): void {
    /* Detect change value from QueryParams to update filter state */
    this._route.queryParamMap.subscribe((paramsAsMap: any) => {
      this.progressSpinnerService.next(true);
      const {
        textToSearch,
        checkIn,
        checkOut,
        rooms,
        adults,
        children,
        value,
        type,
        property,
        direction,
        hotelFacilities,
        benefits,
        guestRating,
        discount,
        priceFrom,
        priceTo,
      } = paramsAsMap.params;
      const productFilterRequest: ProductFilterRequest = {
        search: textToSearch,
        startDate: checkIn,
        endDate: checkOut,
        rooms,
        adults,
        children,
        value,
        type,
        productSort: {
          property,
          direction,
        },
        optionFilter: {
          priceFrom,
          priceTo,
          discount,
          guestRating,
          benefits: benefits ? benefits.split(',').map(Number) : undefined,
          hotelFacilities: hotelFacilities
            ? hotelFacilities.split(',').map(Number)
            : undefined,
        },
      };
      this._productFilterService.nextProductFilterRequest(productFilterRequest);
    });

    /* asssign searchedProductResponse from Service */
    this.searchedProductResponse$ =
      this._productFilterService.searchedProductResponse$.pipe(
        tap((res) => {
          this.progressSpinnerService.next(false);
        })
      );
  }
}
