import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LiveshowImageDialogComponent } from 'src/app/customer/search/components/product-list/product-item/dialog/liveshow-image-dialog/liveshow-image-dialog.component';
import { DIRECT_LINK, URL_API } from 'src/app/models/constance';
import { ImageResponse } from 'src/app/models/response';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss'],
})
export class ProductImageComponent implements OnInit {
  viewImages!: ImageResponse[][];
  thumbImage!: ImageResponse;
  @Input()
  images!: ImageResponse[];
  constructor(private _matDialog: MatDialog) {}

  ngOnInit(): void {
    console.log(this.images);
    this.images = this.images.map((image) => {
      return { ...image, url: `${DIRECT_LINK}/hotel-img/${image.url}` };
    });
    this.thumbImage = this.images.find((image) => image.isThumbnail)!;

    let filtedImages = this.images.filter((image) => !image.isThumbnail);
    this.viewImages = Array.from(
      { length: Math.ceil(this.images.length / 2) },
      (_, index) => filtedImages.slice(index * 2, index * 2 + 2)
    );
  }
  openLiveshowImage(event: any, sltImage: ImageResponse) {
    event.stopPropagation();
    let sltImageIdx = this.images.findIndex((image) => image === sltImage);
    this._matDialog.open(LiveshowImageDialogComponent, {
      data: { images: this.images, selectedImageIdx: sltImageIdx },
    });
  }
}
