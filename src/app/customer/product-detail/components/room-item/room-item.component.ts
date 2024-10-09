import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/customer/services/cart.service';
import { FilterProductService } from 'src/app/customer/services/filter-product.service';
import { AddToCartRequest, FindCartItemRequest } from 'src/app/models/request';
import { DIRECT_LINK } from 'src/app/models/constance';
import { ImageResponse, RoomResponse } from 'src/app/models/response';
import { getDateInFormat } from 'src/app/shared/utils/DateUtils';

@Component({
  selector: 'app-room-item',
  templateUrl: './room-item.component.html',
  styleUrls: ['./room-item.component.scss']
})
export class RoomItemComponent implements OnInit {

  @Input()
  room!: RoomResponse
  roomImages!: ImageResponse[]
  thumbImage!: ImageResponse
  filtedImages!: ImageResponse[]
  start_date !: string;
  end_date !: string;
  adult!: number;
  children!: number;
  room_id!: number;
  @Input()
  isMinPrice: boolean = false
  paymentMethod: string = 'online'
  constructor(private _productFilterService: FilterProductService, private cartService: CartService
    , private toastrService: ToastrService, private router: Router) {
      this.adult = this._productFilterService.adultControl.value;
      this.children = this._productFilterService.childrenControl.value;
    }
    ngOnInit(): void {
    this.start_date = getDateInFormat(new Date(this._productFilterService.startDateControl.value));
    this.end_date = getDateInFormat(new Date(this._productFilterService.endDateControl.value));
    this.roomImages = this.room.roomImages.map(image => {
      return { ...image, url: `${DIRECT_LINK}/room-img/${image.url}` }
    })
    this.thumbImage = this.roomImages.find(image => image.isThumbnail)!
    this.filtedImages = this.roomImages.filter(image => !image.isThumbnail)!
    this.room_id = this.room.id
  }

  onAddToCart() {
    const request: AddToCartRequest = {
      adult: this.adult,
      child: this.children,
      fromDate: this.start_date,
      toDate: this.end_date,
      roomId: this.room_id,
      sessionId: localStorage.getItem("sessionId")
    };

    this.cartService.addItemToCart(request).subscribe({
      next: (response) => {
        if (localStorage.getItem("sessionId") === null) {
          localStorage.setItem("sessionId", response.sessionId);
        }
        this.toastrService.success("Thêm phòng vào giỏ hàng thành công", "Thành công !");
      },
      error: (error) => {
        this.toastrService.error(error.error, "Thất bại !");
      }
    })
  }

  onProceedToCheckout() {
    const request: AddToCartRequest = {
      adult: this.adult,
      child: this.children,
      fromDate: this.start_date,
      toDate: this.end_date,
      roomId: this.room_id,
      sessionId: localStorage.getItem("sessionId")
    };

    this.cartService.addItemToCart(request).subscribe({
      next: (response) => {
        if (localStorage.getItem("sessionId") === null) {
          localStorage.setItem("sessionId", response.sessionId);
        }
        localStorage.setItem("chosenItems", JSON.stringify([response]));
        this.router.navigate(['/checkout']);
      },
      error: (error) => {
        if (error.error == 'Phòng này đã tồn tại trong giỏ hàng !') {
          const data = {
            sessionId: localStorage.getItem("sessionId"),
            roomId: this.room_id
          }
          this.cartService.getCartItemDetails(data).subscribe({
            next: (response) => {
              localStorage.setItem("chosenItems", JSON.stringify([response]));
              this.router.navigate(['/checkout']);
            },
            error: (error) => {
              this.toastrService.error(error.error, "Thất bại !");
            }
          });
        }
      }
    })
  }
}
