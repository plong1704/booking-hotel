import { ViewEncapsulation } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ImageResponse } from 'src/app/models/response';

@Component({
  selector: 'app-ls-image-item',
  templateUrl: './ls-image-item.component.html',
  styleUrls: ['./ls-image-item.component.scss'],
})
export class LsImageItemComponent implements OnInit {
 @Input()
 image!: ImageResponse
 @Input()
 isSlt!: boolean
  constructor() {
    console.log(this.image);
    
  }

  ngOnInit(): void {
  }

}
