import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { OccupancyOption } from 'src/app/models/model';
import { HotelService } from '../../services/hotel.service';
import { AutocompleteSearchResponse } from 'src/app/models/response';
import { ProgressSpinnerService } from '../../services/progress-spinner.service';
import { Router } from '@angular/router';
import { FilterProductService } from '../../services/filter-product.service';
interface Tab {
  idx: number;
  label: string;
  title: string;
  subtitle: string;
}

interface StayType {
  idx: number;
  label: string;
  value: string;
}
@Component({
  selector: 'app-home-banner',
  templateUrl: './home-banner.component.html',
  styleUrls: ['./home-banner.component.scss'],
})
export class HomeBannerComponent implements OnInit {
  @ViewChild('occupancyPopup')
  occupancyPopup!: ElementRef<HTMLDivElement>;
  @ViewChild('occupancyLineForm')
  occupancyLineForm!: ElementRef<HTMLDivElement>;
  @ViewChild('occupancyBox')
  occupancyBox!: ElementRef<HTMLDivElement>;
  @ViewChild('homeBanner')
  homeBanner!: ElementRef<HTMLDivElement>;
  @ViewChild('autocompleteSearch')
  autocompleteSearch!: ElementRef<HTMLDivElement>;
  @ViewChild('locationLineForm')
  locationLineForm!: ElementRef<HTMLDivElement>;
  @ViewChild('startDatepickerToggle')
  startDatepickerToggle!: ElementRef<HTMLDivElement>;
  @ViewChild('endDatepickerToggle')
  endDatepickerToggle!: ElementRef<HTMLDivElement>;

  isShowFilterBar: boolean = false;
  isEnableAutocompleteSearch: boolean = true;
  overlaySwitchBSub: BehaviorSubject<boolean> = new BehaviorSubject(false);
  overlaySwitch$ = this.overlaySwitchBSub.asObservable();
  isEnableOccupancy = false;
  ageOptions!: string[];
  selectedTab!: Tab;
  tabList: Tab[] = [
    {
      idx: 0,
      label: 'Khách sạn & Nhà',
      title: 'Khách sạn & nhà, nhà riêng tư',
      subtitle:
        'Nhận giá tốt nhất trên hơn 2,000,000 bất động sản trên toàn thế giới',
    },
    {
      idx: 1,
      label: 'Nhà riêng tư',
      title: 'Đặt một căn nhà riêng tư trên Spring Hotel',
      subtitle:
        'Nhận giá tốt nhất trên hơn 2,000,000 bất động sản trên toàn thế giới',
    },
  ];
  selectedStayType!: StayType;
  stayTypes: StayType[] = [
    {
      idx: 0,
      label: 'Ở qua đêm',
      value: 'OVERNIGHT',
    },
    {
      idx: 1,
      label: 'Ở trong ngày',
      value: 'DAY-USE',
    },
  ];
  hotelAndHomeForm: any;

  overlayState: { isShow: boolean; currElement: Element | undefined } = {
    isShow: false,
    currElement: undefined,
  };

  overlayStateBSub: BehaviorSubject<{
    isShow: boolean;
    currElement: Element | undefined;
  }> = new BehaviorSubject(this.overlayState);
  overlayState$ = this.overlayStateBSub.asObservable();
  get curOverlayState() {
    return this.overlayStateBSub.value;
  }

  autocompleteSearchs$!: Observable<AutocompleteSearchResponse[] | null>;
  hotelFormGroup!: FormGroup;
  privateHomeFormGroup!: FormGroup;
  constructor(
    private __fb: FormBuilder,
    private _hotelService: HotelService,
    private _progressSpinnerService: ProgressSpinnerService,
    private _router: Router,
    public filterProductService: FilterProductService
  ) {
    this.selectedTab = this.tabList[0];
    this.selectedStayType = this.stayTypes[0];
  }
  ngAfterViewChecked(): void {
    if (this.occupancyPopup) {
      const windowHeight = window.innerHeight;
      const elementBottom =
        this.occupancyPopup.nativeElement.getBoundingClientRect().bottom;
      const pageYOffset = window.pageYOffset;
      if (elementBottom > windowHeight) {
        const deltaElement = elementBottom - windowHeight;
        window.scrollTo({
          top: pageYOffset + deltaElement,
        });
      }
    }
  }
  ngAfterViewInit(): void {
    this.overlayState$.subscribe((value) => {
      this.isEnableOccupancy =
        value.currElement !== this.occupancyLineForm.nativeElement
          ? false
          : true;
      if (value.currElement !== this.locationLineForm.nativeElement) {
        this.isEnableAutocompleteSearch = false;
      } else if (value.currElement === this.locationLineForm.nativeElement) {
        this.isEnableAutocompleteSearch = true;
      }
    });
  }
  ngOnInit(): void {
    this.hotelFormGroup = this.filterProductService.hotelFormGroup;
    this.autocompleteSearchs$ = this.filterProductService.autocompletes$;
    if(this.filterProductService.searchControl.value){
      this.overlayStateBSub.next({
        isShow: true,
        currElement: undefined
      })
    }
  }
  /* Process UI */
  updateOverlayState(element: Element) {
    let { isShow, currElement } = this.curOverlayState;
    if (isShow === true) {
      // select another element
      if (currElement !== element) {
        currElement = element;
      }
      // retarget pre element
      else {
        if (element === this.autocompleteSearch.nativeElement) {
          currElement = element;
          isShow = true;
        } else {
          currElement = undefined;
          isShow = false;
        }
      }
    } else {
      // init
      if (currElement !== element) {
        currElement = element;
        isShow = true;
      }
    }
    this.overlayStateBSub.next({
      isShow: isShow,
      currElement: currElement,
    });
  }

  sltTab(tab: Tab) {
    this.selectedTab = tab;
    this.overlayStateBSub.next({
      isShow: false,
      currElement: undefined,
    });
  }
  sltStayType(stayType: any, element: any) {
    this.selectedStayType = stayType;
    this.hotelFormGroup.patchValue({
      stayType: stayType.value,
    });
  }
  onClickOverlay() {
    this.overlayStateBSub.next({
      isShow: false,
      currElement: undefined,
    });
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // Gọi hàm xử lý sự kiện scroll ở đây
    if (this.occupancyPopup) {
      const occupancyPopupTop =
        this.occupancyPopup.nativeElement.getBoundingClientRect().top;
      if (occupancyPopupTop < 0) {
        this.overlayState.currElement = undefined;
        this.overlayState.isShow = false;
        this.isEnableOccupancy = false;
      }
    }
    const homeBannerBottom =
      this.homeBanner.nativeElement.getBoundingClientRect().bottom;

    if (homeBannerBottom < 0) {
      this.isShowFilterBar = true;
    } else {
      this.isShowFilterBar = false;
    }
  }
  selectAutocomplete(autocompleteSearch: AutocompleteSearchResponse) {
    this.hotelFormGroup.get('search')!.setValue(autocompleteSearch.name);
    this.hotelFormGroup.get('type')!.setValue(autocompleteSearch.type);
    this.hotelFormGroup.get('value')!.setValue(autocompleteSearch.value);
  }
  updateOccupancy(occupancy: OccupancyOption, action: '+' | '-') {
    this.filterProductService.updateOccupancy(occupancy, action);
  }
  onKeyupSearch(value: string) {
    this.filterProductService.searchControl.setValue(value)
  }
}
