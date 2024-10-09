import {
  APIResponse,
  AuthenticationResponse,
} from 'src/app/models/response/model';

import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ThemePalette } from '@angular/material/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/customer/services/auth.service';
import { UserService } from 'src/app/customer/services/user.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ProgressBarService } from 'src/app/customer/services/progress-bar.service';
import { SignInRequest, SocialUserRequest } from 'src/app/models/request/model';
import { MessageDialogService } from 'src/app/customer/services/message-dialog.service';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';

import { finalize, tap, timer } from 'rxjs';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';
import { OAuthProvider } from 'src/app/models/enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  signInFG!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<LoginComponent>,
    private matDialog: MatDialog,
    private _fb: FormBuilder,
    public progressBarService: ProgressBarService,
    private _authService: AuthService,
    private _userService: UserService,
    private _messageDialogService: MessageDialogService,
    private _router: Router,
    private _progressSpinnerService: ProgressSpinnerService,
    private ngZone: NgZone
  ) {
    this.signInFG = this._fb.group({
      username: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: ['', Validators.compose([Validators.required])],
    });
    this._authService.loadGoogleClientLibs();
    (window as any).signInWithGoogleCallback =
      this.signInWithGoogleCallback.bind(this);
  }
  get usernameControl(): FormControl {
    return this.signInFG.get('username') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.signInFG.get('password') as FormControl;
  }

  onClickSignIn(formValue: SignInRequest) {
    this._progressSpinnerService.next(true);
    this._authService
      .signIn(formValue)
      .pipe(
        finalize(() => {
          this._progressSpinnerService.next(false);
        })
      )
      .subscribe((res: AuthenticationResponse) => {
        const { user, accessToken, refreshToken } = res;
        this._userService.nextUser(user);
        this._authService.emitAccessToken(accessToken);
        this._authService.storeCookieRefreshToken(refreshToken);
        this.dialogRef.close();
      });
  }

  onClickForgetPassword() {
    let forgetPasswordDialog = this.matDialog.open(ForgetPasswordComponent);
    forgetPasswordDialog.afterClosed().subscribe((result) => {
      if (result && result.statusCode === 200) {
        this.dialogRef.close();
      }
    });
  }

  signInWithGoogleCallback(response: any) {
    this._progressSpinnerService.next(true);
    this.ngZone.run(() => {
      this._authService
        .signInGoogleCallBack(response)
        .subscribe((res: AuthenticationResponse) => {
          console.log(res);
          const { user, accessToken, refreshToken } = res;
          this._userService.nextUser(user);
          this._authService.emitAccessToken(accessToken);
          this._authService.storeCookieRefreshToken(refreshToken);
          this.dialogRef.close();
        });
    });
  }

  navigateToSignUp() {
    this.dialogRef.close();
    this._router.navigate(['/auth/register']);
  }
  onClickFacebookSign(): void {
    this._authService.signInFacebookCallBack(this.dialogRef);
  }
}
