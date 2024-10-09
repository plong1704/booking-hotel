import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartSvgComponent } from './cart-svg/cart-svg.component';
import { HotelHomeSvgComponent } from './hotel-home-svg/hotel-home-svg.component';
import { PrivateHomeSvgComponent } from './private-home-svg/private-home-svg.component';
import { CheckSvgComponent } from './check-svg/check-svg.component';
import { WifiSvgComponent } from './wifi-svg/wifi-svg.component';
import { StarSvgComponent } from './star-svg/star-svg.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { DomesticSvgComponent } from './domestic-svg/domestic-svg.component';
import { StartRatingComponent } from './start-rating/start-rating.component';
import { LocationMakerSvgComponent } from './location-maker-svg/location-maker-svg.component';
import { TagSvgComponent } from './tag-svg/tag-svg.component';



@NgModule({
  declarations: [
    CartSvgComponent,
    HotelHomeSvgComponent,
    PrivateHomeSvgComponent,
    CheckSvgComponent,
    WifiSvgComponent,
    StarSvgComponent,
    CreditCardComponent,
    DomesticSvgComponent,
    StartRatingComponent,
    LocationMakerSvgComponent,
    TagSvgComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CartSvgComponent,
    HotelHomeSvgComponent,
    PrivateHomeSvgComponent,
    CheckSvgComponent,
    WifiSvgComponent,
    StarSvgComponent,
    CreditCardComponent,
    DomesticSvgComponent,
    StartRatingComponent,
    LocationMakerSvgComponent,
    TagSvgComponent
  ]
})
export class SvgAsTemplateModule { }
