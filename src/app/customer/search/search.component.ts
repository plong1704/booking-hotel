import { log } from 'console';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProductFilterRequest } from 'src/app/models/request';
import { switchMap } from 'rxjs';
import { FilterProductService } from '../services/filter-product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  openDialog = false
  constructor() { }

  ngOnInit(): void {
  }
  a(event: any){
    let overlay = document.getElementById("overlay")
    if(event.target == overlay){
      this.openDialog = false
    }
  }
}
