import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-domestic-svg',
  templateUrl: './domestic-svg.component.html',
  styleUrls: ['./domestic-svg.component.scss']
})
export class DomesticSvgComponent implements OnInit {
  @Input()
  fillColor!: string
  constructor() { }

  ngOnInit(): void {
  }

}
