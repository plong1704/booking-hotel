import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-liveshow-image-dialog',
  templateUrl: './liveshow-image-dialog.component.html',
  styleUrls: ['./liveshow-image-dialog.component.scss']
})
export class LiveshowImageDialogComponent implements OnInit {
  selectedImageIdx!: number
  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public data: any) {
    this.selectedImageIdx = data.selectedImageIdx
  }

  ngOnInit(): void {
  }
  controlLiveshow(action: '+' | '-'){
    let imagesLength = this.data.images.length
    if(action === '+'){
      this.selectedImageIdx++
    }else{
      this.selectedImageIdx--
    }
    if(this.selectedImageIdx > imagesLength - 1){
      this.selectedImageIdx = 0
    }else if(this.selectedImageIdx < 0){
      this.selectedImageIdx = imagesLength - 1
    }
  }
}
