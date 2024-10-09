import { AfterViewChecked, AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, concatMap, finalize, switchMap, tap } from 'rxjs';
import { ProductFilterRequest, SaveFavoriteHotelRequest } from 'src/app/models/request';
import { ProductDetailResponse } from 'src/app/models/response';
import { FilterProductService } from '../services/filter-product.service';
import { ProgressSpinnerService } from '../services/progress-spinner.service';
import { FavoriteHotelService } from '../services/favorite-hotel.service';
import { ToastrService } from 'ngx-toastr';
import {
  HotelResponse,
  ImageResponse,
} from 'src/app/models/response';
import { HotelService } from '../services/hotel.service';
import { MatDialog } from '@angular/material/dialog';
import { LiveshowImageDialogComponent } from '../search/components/product-list/product-item/dialog/liveshow-image-dialog/liveshow-image-dialog.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit, AfterViewChecked {
  @ViewChild('tabWrapper')
  tabWrapper!: ElementRef
  productDetail$!: Observable<ProductDetailResponse>
  minPrice!: number
  constructor(private _route: ActivatedRoute,
    private _productFilterService: FilterProductService,
    private _hotelService: HotelService,
    private _progressSpinnerService: ProgressSpinnerService,
    private favoriteHotelService: FavoriteHotelService,
    private toastrService: ToastrService,
    private _matDialog: MatDialog,
    private _renderer: Renderer2
    ) { }
  ngAfterViewChecked(): void {
  }
  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    /* Detect change value from QueryParams to update filter state */
    this.productDetail$ = this._route.queryParamMap
      .pipe(
        switchMap((paramsAsMap: any) => {
          this._progressSpinnerService.next(true);
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
            rooms: rooms,
            adults: adults,
            children: children,
            value: value,
            type: type,
            productSort: {
              property: property,
              direction: direction,
            },
            optionFilter: {
              priceFrom: priceFrom,
              priceTo: priceTo,
              discount: discount,
              guestRating: guestRating,
              benefits: benefits ? benefits.split(',').map(Number) : undefined,
              hotelFacilities: hotelFacilities
                ? hotelFacilities.split(',').map(Number)
                : undefined,
            },
          };
          this._productFilterService.nextProductFilterRequest(productFilterRequest)
          return this._hotelService.findDetailHotel(value, productFilterRequest)
        },
        
        ),
        tap(() => {
          this._progressSpinnerService.next(false)
        })
      )
    
  }

  onAddToFavoriteList(hotelId: number) {
    const data: SaveFavoriteHotelRequest = {
      hotelId: hotelId,
      username: 'tester' //test user only
    };

    this.favoriteHotelService.save(data).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'Thành công !')
      },
      error: (err) => {
        console.log(err);
        this.toastrService.error(err.error, 'Thất bại !')
      }
    })
  }
  scrollToElement(element: HTMLElement){
    window.scrollTo({
      top: element.offsetTop - 135 - 56,
      left: 0,
      behavior: 'smooth'
    })
  }
  @HostListener('window:scroll')
  onWindowScroll() {
    if(this.tabWrapper){
      console.log(this.tabWrapper.nativeElement.getBoundingClientRect());
      
      if(this.tabWrapper.nativeElement.getBoundingClientRect().y === 135){
        this._renderer.removeClass(this.tabWrapper.nativeElement, 'grid')
        this._renderer.removeClass(this.tabWrapper.nativeElement, 'wide')
      }else{
        this._renderer.addClass(this.tabWrapper.nativeElement, 'grid')
        this._renderer.addClass(this.tabWrapper.nativeElement, 'wide')
      }
    }
  }
}
