import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/customer/services/user.service';
import { AuthService } from 'src/app/customer/services/auth.service';
import { Router } from '@angular/router';
import { LoginComponent } from 'src/app/customer/auth/components/login/login.component';
import { Observable, finalize, tap } from 'rxjs';
import { UserDTO } from 'src/app/models/model';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';
interface UserOverlayPanel {
  user: UserDTO | null;
  navigateGroups: {
    label: string;
    path: string;
    icon: string;
    action?: () => void;
  }[][];
}
@Component({
  selector: 'app-customer-header',
  templateUrl: './customer-header.component.html',
  styleUrls: ['./customer-header.component.scss'],
})
export class CustomerHeaderComponent implements OnInit {
  isShowUserOverlayPannel: boolean = false;
  userOverlayPanel: UserOverlayPanel = {
    user: null,
    navigateGroups: [
      [
        {
          label: 'Quản lý tài khoản',
          path: 'account',
          icon: 'fa-regular fa-user',
        },
        {
          label: 'Đăng xuất',
          path: '',
          icon: 'fa-solid fa-arrow-right-from-bracket',
          action: this.onClickSignOut.bind(this),
        },
      ],
      [
        {
          label: 'Trợ giúp',
          path: '',
          icon: 'fa-regular fa-circle-question',
        },
        {
          label: 'Gửi phản hồi',
          path: '',
          icon: 'fa-solid fa-triangle-exclamation',
        },
      ],
    ],
  };

  user$!: Observable<UserDTO | null>;
  constructor(
    public dialog: MatDialog,
    public userService: UserService,
    private _authService: AuthService,
    private _router: Router,
    private _progressSinnerService: ProgressSpinnerService
  ) {}
  openLoginFormDialog(): void {
    this.dialog.open(LoginComponent, {});
  }
  ngOnInit(): void {
    this.user$ = this.userService.user$;
    this.user$.subscribe((user) => {
      this.userOverlayPanel.user = user;
    });
  }
  onClickSignOut() {
    this._progressSinnerService.next(true);
    let refreshToken = this._authService.refreshTokenFromCookie;
    if (refreshToken) {
      this._authService.signOut(refreshToken).subscribe(res => {
        this._progressSinnerService.next(false)
      });
    }
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.isShowUserOverlayPannel = false;
    let avatar = document.getElementById('avatar');

    this.isShowUserOverlayPannel = avatar?.contains(event.target as Node)
      ? true
      : false;
  }
}
