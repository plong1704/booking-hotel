import { log } from 'console';
import { DIRECT_LINK, URL_API, URL_CLIENT } from 'src/app/models/constance';
import { ImageResponse, SearchedProductItemResponse } from './../../../../../models/response';
import { Component, Input, OnInit } from '@angular/core';
import { HotelService } from 'src/app/customer/services/hotel.service';
import { FilterProductService } from 'src/app/customer/services/filter-product.service';
import { NavigationExtras, Router } from '@angular/router';
import { ProductFilterRequest } from 'src/app/models/request';
import { MatDialog } from '@angular/material/dialog';
import { LiveshowImageDialogComponent } from './dialog/liveshow-image-dialog/liveshow-image-dialog.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input()
  searchedProduct!: SearchedProductItemResponse
  isHoverReviewItem = false
  @Input()
  isSearchedProduct: boolean = false
  thumbImage!: ImageResponse
  hotelImages!: ImageResponse[]
  hoveredImage!: ImageResponse
  constructor(
    private hotelService: HotelService,
    private filterProductService: FilterProductService,
    private router: Router,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
      this.searchedProduct.hotelImages = this.searchedProduct.hotelImages.map(image => {
        return {...image, url: `${DIRECT_LINK}/hotel-img/${image.url}`}
      })
      this.thumbImage = this.searchedProduct.hotelImages.find(hotel => hotel.isThumbnail)!
      this.hotelImages = this.searchedProduct.hotelImages.filter(hotel => !hotel.isThumbnail)
  }

  computeStarCover(starRating: number): string{
    const coverNum = 100 - ((starRating * 100) / 5)
    return coverNum.toString() + "%";
  }
  hoverImage(image: ImageResponse){
    this.hoveredImage = image
    this.isHoverReviewItem = true
  }
  seletectProductItem(sltItem: SearchedProductItemResponse){
    let curFilter: ProductFilterRequest = this.filterProductService.currProductFilterRequest!
    const { search, startDate, endDate, rooms, adults, children , value, type } =
    curFilter;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        textToSearch: search,
        checkIn: new Date(startDate).toISOString(),
        checkOut: new Date(endDate).toISOString(),
        rooms: rooms,
        adults: adults,
        children: children,
        value: sltItem.productId,
        type: type,
      },
    };
    console.log(navigationExtras);
    
    this.router.navigate([`/product/${sltItem.name.replace(/ /g, "-")}/${curFilter.type}`], navigationExtras)
  }
  openLiveshowImage(event: any, images: ImageResponse[], selectedImageIdx: number){
    event.stopPropagation();
    this.matDialog.open(LiveshowImageDialogComponent, {
      data: {images: images, selectedImageIdx: selectedImageIdx}
    })    
  }
}
