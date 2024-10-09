import { ParamMap } from '@angular/router';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { log } from 'console';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { FilterProductService } from 'src/app/customer/services/filter-product.service';
import { OccupancyOption } from 'src/app/models/model';
import { ProductFilterRequest } from 'src/app/models/request';
import { AutocompleteSearchResponse } from 'src/app/models/response';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.scss'],
})
export class FilterBarComponent implements OnInit {
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
  enableOverlay: boolean = false;
  isEnableOccupancy = false;
  ageOptions!: string[];
  hotelFormGroup!: FormGroup;
  privateHomeFormGroup!: FormGroup;
  isEnableAutocompleteSearch: boolean = true;
  isShowFilterBar: boolean = false;
  autocompleteSearchs$!: Observable<AutocompleteSearchResponse[] | null>;
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
  constructor(
    private _fb: FormBuilder,
    public filterProductService: FilterProductService,
    private _progressSpinnerService: ProgressSpinnerService
  ) {
    this.privateHomeFormGroup = this._fb.group({
      place: '',
      startDate: new Date(),
      endDate: new Date(),
      occupancy: this._fb.group({
        room: filterProductService.occupancyOptions[0].value,
        adult: filterProductService.occupancyOptions[1].value,
        children: filterProductService.occupancyOptions[2].value,
      }),
    });
    this.hotelFormGroup = this.filterProductService.hotelFormGroup
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
    this.autocompleteSearchs$ = this.filterProductService.autocompletes$
  }
  updateOverlayState(element: Element) {
    let { isShow, currElement } = this.curOverlayState;
    console.log(this.curOverlayState);
    
    if (isShow === true) {
      // select another element
      if (currElement !== element) {
        currElement = element;
      }
      // retarget pre element
      else {
        if (this.autocompleteSearch && element === this.autocompleteSearch.nativeElement) {
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
    console.log(this.curOverlayState);
    
  }
  onClickOverlay() {
    this.overlayStateBSub.next({
      isShow: false,
      currElement: undefined,
    });
  }
  private lastScrollTop = 0;
  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    // Gọi hàm xử lý sự kiện scroll ở đây
    // if (this.occupancyPopup) {
    //   const occupancyPopupTop =
    //     this.occupancyPopup.nativeElement.getBoundingClientRect().top;
    //   if (occupancyPopupTop < 0) {
    //     this.overlayState.currElement = undefined;
    //     this.overlayState.isShow = false;
    //     this.isEnableOccupancy = false;
    //   }
    // }
    // const homeBannerBottom =
    //   this.homeBanner.nativeElement.getBoundingClientRect().bottom;

    // if (homeBannerBottom < 0) {
    //   this.isShowFilterBar = true;
    // } else {
    //   this.isShowFilterBar = false;
    // }

    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop < this.lastScrollTop) {
      // Scrolling up
      console.log('Scrolling up');
      // You can perform your actions here for scrolling up
    }

    this.lastScrollTop = currentScrollTop;
  }
  selectAutocomplete(autocompleteSearch: AutocompleteSearchResponse) {
    this.hotelFormGroup.get('search')!.patchValue(autocompleteSearch.name);
    this.hotelFormGroup.get('type')!.patchValue(autocompleteSearch.type);
    this.hotelFormGroup.get('value')!.patchValue(autocompleteSearch.value);
  }
  updateOccupancy(occupancy: OccupancyOption, action: '+' | '-') {
    this.filterProductService.updateOccupancy(occupancy, action);
  }
  onSubmitHotelFormGroup() {
    this.filterProductService.onSubmitHotelFormGroup();
    this.onClickOverlay();
  }
  onKeyupSearch(value: string) {
    this.filterProductService.searchControl.setValue(value)
  }
}
