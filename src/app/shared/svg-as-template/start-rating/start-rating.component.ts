import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-rating',
  templateUrl: './start-rating.component.html',
  styleUrls: ['./start-rating.component.scss']
})
export class StartRatingComponent implements OnInit {
  @Input() 
  fillColor: string = 'gold'
  cover: string = '0%'
  @Input()
  starRating!: number
  constructor() { }

  ngOnInit(): void {
    this.cover = this.computeStarCover(this.starRating)
  }
  computeStarCover(starRating: number): string{
    const coverNum = 100 - ((starRating * 100) / 5)
    return coverNum.toString() + "%";
  }
}
