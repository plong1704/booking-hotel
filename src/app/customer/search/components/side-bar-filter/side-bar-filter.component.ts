import { KeyValue } from '@angular/common';
import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { log } from 'console';
import { id } from 'date-fns/locale';
import {
  BehaviorSubject,
  combineLatest,
  concatMap,
  debounceTime,
  forkJoin,
  map,
  Observable,
  of,
  pipe,
  switchMap,
  take,
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
  FilterOptionItemResponse,
  OptionResponse,
  SearchedProductResponse,
} from 'src/app/models/response';
export interface RadioOption {
  label: string;
  value: any;
  total?: number;
}
export interface CheckBoxOption {
  checked: boolean;
  label: string;
  value: any;
  total?: number;
}
export interface FilterField {
  type: string;
  name: string;
  label: string;
  value?: string[] | string;
  color: 'primary' | 'accent';
  validation?: any;
  radioOptions?: RadioOption[];
  checkOptions?: CheckBoxOption[];
}
export interface SelectedField {
  label: string;
  selectedCheckOptions: SelectedCheckOption[];
}
export interface SelectedCheckOption {
  name: string;
  label: string;
  value: any;
  checked: boolean;
  type: string;
}
@Component({
  selector: 'app-side-bar-filter',
  templateUrl: './side-bar-filter.component.html',
  styleUrls: ['./side-bar-filter.component.scss'],
})
export class SideBarFilterComponent
  implements OnInit, OnChanges, AfterViewInit
{
  searchedProduct$!: Observable<SearchedProductResponse | null>;
  minFinalPrice!: number;
  maxFinalPrice!: number;
  priceFrom!: number;
  priceTo!: number;
  @ViewChild('thumbLeftInput', { static: true })
  thumbLeftInput!: ElementRef;
  @ViewChild('thumbRightInput')
  thumbRightInput!: ElementRef;
  @ViewChild('thumbLeft')
  thumbLeft!: ElementRef;
  @ViewChild('thumbRight')
  thumbRight!: ElementRef;
  @ViewChild('range')
  range!: ElementRef;
  priceFromControl = new FormControl();
  filterFields: FilterField[] = [
    {
      type: 'radio',
      name: 'discount',
      label: 'Ưu đãi và giảm giá',
      radioOptions: [],
      value: '',
      color: 'primary',
    },
    {
      type: 'checkbox',
      name: 'hotelFacilities',
      label: 'Tiện nghi chỗ nghỉ',
      checkOptions: [],
      color: 'primary',
    },
    {
      type: 'radio',
      name: 'guestRating',
      label: 'Đánh giá',
      value: '',
      radioOptions: [],
      color: 'primary',
    },
    {
      type: 'checkbox',
      name: 'benefits',
      label: 'Chọn phòng có',
      value: '',
      checkOptions: [],
      color: 'primary',
    },
  ];
  filterFormGroup!: FormGroup;
  myFilterField: FilterField = {
    type: 'checkbox',
    name: 'myfilter',
    label: 'Bộ lọc của quý khách',
    checkOptions: [],
    color: 'primary',
  };
  selectedField: SelectedField = {
    label: 'Bộ lọc của quý khách',
    selectedCheckOptions: [],
  };
  get discountControl(): FormControl {
    return this.filterFormGroup.get('discount') as FormControl;
  }
  priceFromBSub: BehaviorSubject<number | null> = new BehaviorSubject<
    number | null
  >(null);
  priceFrom$ = this.priceFromBSub.asObservable().pipe(debounceTime(1000));
  priceToBSub: BehaviorSubject<number | null> = new BehaviorSubject<
    number | null
  >(null);
  priceTo$ = this.priceToBSub.asObservable().pipe(debounceTime(1000));
  constructor(
    private __fb: FormBuilder,
    private _productFilterService: FilterProductService,
    private cdr: ChangeDetectorRef,
    private _route: ActivatedRoute,
    private _router: Router,
    private _progressSpinnerService: ProgressSpinnerService
  ) {
    this.filterFormGroup = this.__fb.group({});
  }
  ngAfterViewInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {}
  ngOnInit(): void {
    /* Replace QueryPrams after debounceTime filter range */
    this.priceFrom$.subscribe((value) => {
      if (value) {
        const queryParams = { ...this._route.snapshot.queryParams };
        queryParams['priceFrom'] = value;
        this._router.navigate([], {
          queryParams,
          replaceUrl: true,
          queryParamsHandling: 'merge',
        });
      }
    });
    this.priceTo$.subscribe((value) => {
      if (value) {
        const queryParams = { ...this._route.snapshot.queryParams };

        queryParams['priceTo'] = value;

        this._router.navigate([], {
          queryParams,
          replaceUrl: true,
          queryParamsHandling: 'merge',
        });
      }
    });
    /* Process slider range when server response searchedProduct */
    this._productFilterService.searchedProductResponse$.subscribe(
      (searchedProduct) => {
        if (searchedProduct) {
          this.minFinalPrice = searchedProduct.minFinalPrice;
          this.maxFinalPrice = searchedProduct.maxFinalPrice;
          this.priceFrom = this.minFinalPrice;
          this.priceTo = this.maxFinalPrice;
          let curFilter: ProductFilterRequest | null =
            this._productFilterService.currProductFilterRequest;
          if (curFilter?.optionFilter?.priceFrom) {
            this.priceFrom = curFilter?.optionFilter?.priceFrom;
          }
          if (curFilter?.optionFilter?.priceTo) {
            this.priceTo = curFilter?.optionFilter?.priceTo;
          }
          this.changeLeftSlider('update');
          this.changeRightSlider('update');
        }else{
          this.priceFrom = 0
          this.priceTo = 0
        }
      }
    );
    /* Fetch options for filterbar */
    combineLatest([this._productFilterService.productFilterRequest$, this._productFilterService.searchedProductResponse$]).pipe(
      switchMap(response => {
        let filter = response[0]
        /* Setup sidebar options */
        let benefitOptions$ = this._productFilterService.findBenefitOptions(
          filter!
        );
        let userRateOptions$ = this._productFilterService.findUserRateOptions(
          filter!
        );
        let hotelFacilities$ =
          this._productFilterService.findHotelFacilityOptions(filter!);
        let discountOptions$ = this._productFilterService.findDiscountOptions(
          filter!
        );
        return combineLatest([
            benefitOptions$,
            userRateOptions$,
            hotelFacilities$,
            discountOptions$,
          ]);
      })
    ).subscribe((options) => {
      const curFilter: ProductFilterRequest =
        this._productFilterService.currProductFilterRequest!;
      const optionFilter: OptionFilterRequest | undefined =
        curFilter!.optionFilter;
      let benefitOptions: FilterOptionItemResponse[] = options[0];
      let userRateOptions: FilterOptionItemResponse[] = options[1];
      let hotelFacilityOptions: FilterOptionItemResponse[] = options[2];
      let discountOptions: FilterOptionItemResponse[] = options[3];
      const discountValue: number | null =
        optionFilter && optionFilter.discount ? optionFilter.discount : null;
      const benefits: number[] | undefined =
        optionFilter && optionFilter.benefits
          ? optionFilter.benefits
          : undefined;
      const hotelFacilities: number[] | undefined =
        optionFilter && optionFilter.hotelFacilities
          ? optionFilter.hotelFacilities
          : undefined;
      const rate: number | null =
        optionFilter && optionFilter.guestRating
          ? optionFilter.guestRating
          : null;
      this.setupFilterOptions(
        this.filterFields[0],
        discountOptions,
        discountValue
      );
      this.setupFilterOptions(
        this.filterFields[1],
        hotelFacilityOptions,
        hotelFacilities
      );
      this.setupFilterOptions(this.filterFields[2], userRateOptions, rate);
      this.setupFilterOptions(this.filterFields[3], benefitOptions, benefits);
    });
   
  }
  private buildCheckboxOptions(
    fetchedOptions: FilterOptionItemResponse[],
    dynamicFieldName: string,
    seletedIds: any[] | undefined
  ): CheckBoxOption[] {
    return fetchedOptions.map(
      (filterOptionResponse: FilterOptionItemResponse) => {
        const { name, value, total } = filterOptionResponse;
        let checked =
          seletedIds &&
          seletedIds?.includes(Number.parseInt(filterOptionResponse.value))
            ? true
            : false;
        if (checked) {
          let sltOptTmp: SelectedCheckOption = {
            name: dynamicFieldName,
            label: name,
            value: value,
            checked: checked,
            type: 'checkbox',
          };
          let foundSltOption: SelectedCheckOption | undefined =
            this.selectedField.selectedCheckOptions.find(
              (option) =>
                option.name == sltOptTmp.name && option.value == sltOptTmp.value
            );
          if (!foundSltOption) {
            this.selectedField.selectedCheckOptions.unshift(sltOptTmp);
          }
        }
        return {
          checked: checked,
          label: name,
          value: value,
          total: total,
        } as CheckBoxOption;
      }
    );
  }
  private buildRadioOptions(
    fetchedOptions: FilterOptionItemResponse[],
    dynamicField: FilterField,
    selecteValue: any
  ): RadioOption[] {
    return fetchedOptions.map(
      (filterOptionResponse: FilterOptionItemResponse) => {
        const { name, value, total } = filterOptionResponse;
        let isValue: boolean = selecteValue == value;
        if (isValue) {
          dynamicField.value = value;
          let sltOptTmp: SelectedCheckOption = {
            name: dynamicField.name,
            label: name,
            value: value,
            checked: isValue,
            type: 'radio',
          };
          let foundSltOption: SelectedCheckOption | undefined =
            this.selectedField.selectedCheckOptions.find(
              (option) =>
                option.name == sltOptTmp.name && option.value == sltOptTmp.value
            );
          if (!foundSltOption) {
            this.selectedField.selectedCheckOptions.unshift(sltOptTmp);
          }
        }
        return {
          label: name,
          value: value,
          total: total,
        } as RadioOption;
      }
    );
  }
  changeLeftSlider(type: 'update' | 'change') {
    let thumbWidth = this.thumbLeft.nativeElement.offsetWidth;
    this.thumbLeftInput.nativeElement.value = this.priceFrom = Math.min(
      this.priceFrom,
      this.priceTo - 1
    );

    const percent =
      ((this.priceFrom - this.minFinalPrice) /
        (this.maxFinalPrice - this.minFinalPrice)) *
      100;
    this.thumbLeft.nativeElement.style.left = `calc(${percent}% - ${
      percent * (thumbWidth / 100)
    }px)`;

    this.range.nativeElement.style.left = percent + '%';
    if (this.priceFrom + 1 == this.priceTo) {
      this.thumbLeftInput.nativeElement.style.zIndex = 5;
    } else {
      this.thumbLeftInput.nativeElement.style.zIndex = 4;
    }
    if (type === 'change') {
      this.priceFromBSub.next(this.priceFrom);
    }
  }

  changeRightSlider(type: 'update' | 'change') {
    let thumbWidth = this.thumbRight.nativeElement.offsetWidth;
    this.thumbRightInput.nativeElement.value = this.priceTo = Math.max(
      this.priceTo,
      this.priceFrom + 1
    );
    const percent =
      ((this.priceTo - this.minFinalPrice) /
        (this.maxFinalPrice - this.minFinalPrice)) *
      100;
    this.thumbRight.nativeElement.style.right = `calc(${100 - percent}% - ${
      100 - percent
    }*${thumbWidth / 100}px)`;
    this.range.nativeElement.style.right = 100 - percent + '%';

    if (this.priceTo + 1 == this.priceFrom) {
      this.thumbRightInput.nativeElement.style.zIndex = 4;
    } else {
      this.thumbRight.nativeElement.style.zIndex = 5;
    }
    if (type === 'change') {
      this.priceToBSub.next(this.priceTo);
    }
  }
  changeSelectedOption(sltOption: SelectedCheckOption) {
    this._productFilterService.changeSelectedOption(sltOption);
  }
  clearSelectedOption() {
    let queryParams = { ...this._route.snapshot.queryParams };

    this.selectedField.selectedCheckOptions.forEach((item) => {
      item.checked = false;
      item.value = '';
    });
    this.filterFields.forEach((field) => {
      delete queryParams[field.name];
      field.value = '';
    });
    this._router.navigate([], {
      queryParams,
    });
  }
  private setupFilterOptions(
    field: FilterField,
    filterOptionItems: FilterOptionItemResponse[],
    sltValues: any
  ) {
    const { type } = field;
    if (type === 'radio') {
      field.radioOptions = this.buildRadioOptions(
        filterOptionItems,
        field,
        sltValues
      );
    } else if (type === 'checkbox') {
      field.checkOptions = this.buildCheckboxOptions(
        filterOptionItems,
        field.name,
        sltValues
      );
    }
  }
}
