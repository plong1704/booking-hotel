import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-star-svg',
  templateUrl: './star-svg.component.html',
  styleUrls: ['./star-svg.component.scss']
})
export class StarSvgComponent implements OnInit {
  @Input()
  fillColor!: string
  constructor() { }

  ngOnInit(): void {
  }

}
