import { take } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FilterProductService } from 'src/app/customer/services/filter-product.service';
import { ProductFilterRequest } from 'src/app/models/request';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-nav-bar-filter',
  templateUrl: './nav-bar-filter.component.html',
  styleUrls: ['./nav-bar-filter.component.scss']
})
export class NavBarFilterComponent implements OnInit {
  tabs: {label: string, value: string}[] = [
    {label: "Phù hợp nhất", value: "default"},
    {label:"Tên sản phẩm", value: "name"},
    {label:"Giá thấp nhất trước", value: "price"},
    {label:"Mức độ hài lòng", value: "rate"},
  ];
  sltTabValue = "default"
  constructor(private _productFilterService: FilterProductService, private _route: ActivatedRoute, private _router: Router) {
    let tabValue = this._route.snapshot.queryParams["property"]
    this.sltTabValue = tabValue? tabValue : "default"
  }

  ngOnInit(): void {
  }
  selectTab(value: string) {
    this.sltTabValue = value
    let currProductFilterRequest: any = {...this._route.snapshot.queryParams}
    
    if (currProductFilterRequest) {
      if (value === "default") {
        currProductFilterRequest.productSortRequest = undefined
      } else if (value === "name") {
        currProductFilterRequest.productSortRequest = {
          direction: "asc",
          property: "name"
        }
      } else if (value === "price") {
        currProductFilterRequest.productSortRequest = {
          direction: "asc",
          property: "price"
        }
      }else if (value === "rate") {
        currProductFilterRequest.productSortRequest = {
          direction: "desc",
          property: "rate"
        }
      }
      const queryParams = { ...this._route.snapshot.queryParams };
      queryParams['property'] = currProductFilterRequest.productSortRequest?.property;
      queryParams['direction'] = currProductFilterRequest.productSortRequest?.direction;
      this._router.navigate([], { queryParams , replaceUrl: true, queryParamsHandling: 'merge'});
    }
  }
}
