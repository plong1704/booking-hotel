import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  combineLatest,
  concatMap,
  debounceTime,
  finalize,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { URL_API } from 'src/app/models/constance';
import {
  OptionFilterRequest,
  ProductFilterRequest,
} from 'src/app/models/request';
import {
  APIResponse,
  AutocompleteSearchResponse,
  FilterOptionItemResponse,
  SearchedProductItemResponse,
  SearchedProductResponse,
} from 'src/app/models/response';
import { SelectedCheckOption } from '../search/components/side-bar-filter/side-bar-filter.component';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { OccupancyOption } from 'src/app/models/model';
import * as moment from 'moment';
import { ProgressSpinnerService } from './progress-spinner.service';
import { HotelService } from './hotel.service';
import { log } from 'console';

@Injectable({
  providedIn: 'root',
})
export class FilterProductService {
  private productFilterRequestBSub: BehaviorSubject<ProductFilterRequest | null> =
    new BehaviorSubject<ProductFilterRequest | null>(null);
  productFilterRequest$ = this.productFilterRequestBSub.asObservable();

  searchedProductResponseBSub: BehaviorSubject<SearchedProductResponse | null> =
    new BehaviorSubject<SearchedProductResponse | null>(null);
  searchedProductResponse$: Observable<SearchedProductResponse | null> =
    this.searchedProductResponseBSub.asObservable();

  autocompletes$!: Observable<AutocompleteSearchResponse[] | null>;

  nextProductFilterRequest(value: ProductFilterRequest) {
    this.productFilterRequestBSub.next(value);
  }
  hotelFormGroup!: FormGroup;
  get getHotelFormGroup(): FormGroup {
    return this.hotelFormGroup;
  }
  get currProductFilterRequest() {
    return this.productFilterRequestBSub.value;
  }
  get searchControl(): FormControl {
    return this.hotelFormGroup.get('search') as FormControl;
  }
  get startDateControl(): FormControl {
    return this.hotelFormGroup.get('startDate') as FormControl;
  }
  get endDateControl(): FormControl {
    return this.hotelFormGroup.get('endDate') as FormControl;
  }
  get occupancyGroup(): FormGroup {
    return this.hotelFormGroup.get('occupancy') as FormGroup;
  }
  get adultControl(): FormControl {
    return this.occupancyGroup.get('adults') as FormControl;
  }
  get childrenControl(): FormControl {
    return this.occupancyGroup.get('children') as FormControl;
  }
  get roomControl(): FormControl {
    return this.occupancyGroup.get('rooms') as FormControl;
  }
  get valueControl(): FormControl {
    return this.hotelFormGroup.get('value') as FormControl;
  }
  occupancyOptions!: OccupancyOption[];
  minStartDate!: Date;
  minEndDate!: Date;
  private searchBSub: BehaviorSubject<string> = new BehaviorSubject<string>('');
  constructor(
    private _httpClient: HttpClient,
    private _route: ActivatedRoute,
    private _router: Router,
    private _fb: FormBuilder,
    private _progressSpinnerService: ProgressSpinnerService,
    private _hotelService: HotelService
  ) {
    /* Validate min date of Mat-datepicker */
    this.minStartDate = new Date();
    this.minEndDate = moment(this.minStartDate).add(1, 'day').toDate();
    this.occupancyOptions = [
      {
        idx: 0,
        label: 'Phòng',
        value: 1,
        name: 'rooms',
      },
      {
        idx: 1,
        label: 'Người lớn',
        subLabel: 'Lớn hơn hoặc bằng 18 tuổi',
        value: 2,
        name: 'adults',
      },
      {
        idx: 2,
        label: 'Trẻ em',
        subLabel: 'Từ 0 tới 17 tuổi',
        value: 1,
        name: 'children',
      },
    ];
    /* Setup Standard Filter FormGroup */
    this.hotelFormGroup = this._fb.group({
      search: ['', Validators.required],
      startDate: [new Date(this.minStartDate), Validators.required],
      endDate: [new Date(this.minEndDate), Validators.required],
      occupancy: this._fb.group({
        rooms: [this.occupancyOptions[0].value, Validators.required],
        adults: [this.occupancyOptions[1].value, Validators.required],
        children: [this.occupancyOptions[2].value, Validators.required],
      }),
      value: ['', Validators.required],
      type: ['', Validators.required],
    });

    this.startDateControl.valueChanges.subscribe((startDate) => {
      this.minStartDate = new Date(startDate);
      this.minEndDate = moment(this.minStartDate).add(1, 'day').toDate();
      this.endDateControl.patchValue(this.minEndDate);
    });
    /* Assign autocompletes$ by search$ when search$ emitted a value */
    this.autocompletes$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      switchMap((search: string) => {
        if (search.trim().length > 0) {
          return this._hotelService.getAutocompleteSearch(search);
        } else {
          return of(null);    
        }
      }),
    );
    /* Detect change state filter to reassign for Standard Filter FormGroup and update state of SearchedProduct after API response */
    this.searchedProductResponse$ = this.productFilterRequest$.pipe(
      switchMap((filter) => {
        if (filter) {
          return this.filterProduct(filter).pipe(
            map((response) => {
              let curFilter: ProductFilterRequest =
                this.currProductFilterRequest!;
              const {
                startDate,
                endDate,
                search,
                adults,
                children,
                rooms,
                type,
                value,
              } = curFilter;
              this.hotelFormGroup.setValue({
                search,
                startDate,
                endDate,
                occupancy: {
                  rooms,
                  adults,
                  children,
                },
                type,
                value,
              });
              return response.data;
            })
          );
        } else {
          return of(null);
        }
      }),
    );
    this.hotelFormGroup.valueChanges.subscribe(v => console.log(v))
  }
  updateOccupancy(occupancy: OccupancyOption, action: '+' | '-') {
    let curValue: number = Number.parseInt(
      this.occupancyGroup.get(occupancy.name)!.value
    );
    if (action === '+') {
      curValue++;
      this.occupancyGroup.get(occupancy.name)?.patchValue(curValue);
    } else {
      curValue--;
      this.occupancyGroup.get(occupancy.name)?.patchValue(curValue);
    }
  }
  selectAutocomplete(autocompleteSearch: AutocompleteSearchResponse) {
    this.searchControl.patchValue(autocompleteSearch.name);
    this.hotelFormGroup.get('type')!.patchValue(autocompleteSearch.type);
    this.hotelFormGroup.get('value')!.patchValue(autocompleteSearch.value);
  }
  onSubmitHotelFormGroup() {
    const { search, startDate, endDate, occupancy, value, type } =
      this.hotelFormGroup.value;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        textToSearch: search,
        checkIn: new Date(startDate).toISOString(),
        checkOut: new Date(endDate).toISOString(),
        rooms: occupancy.rooms,
        adults: occupancy.adults,
        children: occupancy.children,
        value: value,
        type: type,
      },
    };
    this._router.navigate(['/search'], navigationExtras);
  }
  public filterProduct(
    productFilterRequest: ProductFilterRequest
  ): Observable<APIResponse<SearchedProductResponse>> {
    let url = URL_API.concat(`/api/hotel/search`);
    return this._httpClient.post<APIResponse<SearchedProductResponse>>(
      url,
      productFilterRequest,
      {
        responseType: 'json',
      }
    );
  }
  public findBenefitOptions(
    productFilterRequest: ProductFilterRequest
  ): Observable<FilterOptionItemResponse[]> {
    let url = URL_API.concat(`/api/filter/option/benefits`);
    return this._httpClient.post<FilterOptionItemResponse[]>(
      url,
      productFilterRequest,
      {
        responseType: 'json',
      }
    );
  }
  public findUserRateOptions(
    productFilterRequest: ProductFilterRequest
  ): Observable<FilterOptionItemResponse[]> {
    let url = URL_API.concat(`/api/filter/option/user-rates`);
    return this._httpClient.post<FilterOptionItemResponse[]>(
      url,
      productFilterRequest,
      {
        responseType: 'json',
      }
    );
  }
  public findHotelFacilityOptions(
    productFilterRequest: ProductFilterRequest
  ): Observable<FilterOptionItemResponse[]> {
    let url = URL_API.concat(`/api/filter/option/hotel-facilities`);
    return this._httpClient.post<FilterOptionItemResponse[]>(
      url,
      productFilterRequest,
      {
        responseType: 'json',
      }
    );
  }
  public findDiscountOptions(
    productFilterRequest: ProductFilterRequest
  ): Observable<FilterOptionItemResponse[]> {
    let url = URL_API.concat(`/api/filter/option/discounts`);
    return this._httpClient.post<FilterOptionItemResponse[]>(
      url,
      productFilterRequest,
      {
        responseType: 'json',
      }
    );
  }
  public changeSelectedOption(sltOption: SelectedCheckOption) {
    let queryParams = { ...this._route.snapshot.queryParams };
    if (sltOption.type === 'radio') {
      if (sltOption.checked === false) {
        delete queryParams[sltOption.name];
      } else {
        queryParams[sltOption.name] = sltOption.value;
      }
    } else if (sltOption.type === 'checkbox') {
      let idsString: string | undefined = queryParams[sltOption.name]
        ? queryParams[sltOption.name]
        : undefined;
      let ids: number[] = idsString
        ? queryParams[sltOption.name].split(',').map(Number)
        : [];
      if (sltOption.checked === false) {
        ids = ids.filter((id) => id != sltOption.value);
      } else {
        ids.push(sltOption.value);
      }
      if (ids.length > 0) {
        let valueString = ids.length === 1 ? ids[0].toString() : ids.join(',');
        queryParams[sltOption.name] = valueString;
      } else {
        queryParams[sltOption.name] = '';
        delete queryParams[sltOption.name];
      }
    }
    this._router.navigate([], {
      queryParams,
    });
  }
}
