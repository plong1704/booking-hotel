import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  Router,
  RouterState,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  path: string = '/account';
  initUrl!: string;
  sidebarNavigates = [
    {
      label: 'Hồ sơ',
      path: 'profile',
      icon: '',
      isExpanded: true,
      scrollIntoViewList: [
        {
          label: 'Thông tin người dùng',
          path: 'user-detail',
        },
        {
          label: 'Phương thức thanh toán',
          path: 'payment-method',
        },
      ],
    },
    {
      label: 'Đơn đặt chỗ của tôi',
      path: 'bookings',
      icon: '',
      isExpanded: false,
      scrollIntoViewList: [],
    },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.initUrl = this.router.url;
  }
  ngOnInit(): void {}
  ngAfterViewInit(): void {
    
  }
  
}
