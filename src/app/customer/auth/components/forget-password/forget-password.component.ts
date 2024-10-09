import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { concatMap, finalize, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/customer/services/auth.service';
import { MailOTPService } from 'src/app/customer/services/mail-otp.service';
import { MessageDialogService } from 'src/app/customer/services/message-dialog.service';
import { ProgressBarService } from 'src/app/customer/services/progress-bar.service';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { OTPType } from 'src/app/models/enum';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  usernameControl: FormControl = new FormControl('', Validators.required);
  constructor(
    public progressBarService: ProgressBarService,
    public progressSpinnerService: ProgressSpinnerService,
    private _authService: AuthService,
    private _mailOTPService: MailOTPService,
    private _messageDialogService: MessageDialogService,
    private _router: Router,
    private _matDialogRef: MatDialogRef<ForgetPasswordComponent>
  ) {}
  validateUsername(username: string) {
    this.progressSpinnerService.next(true);
    this._authService
      .validateUser(username)
      .pipe(
        switchMap((res) => {
          return this._mailOTPService.generateMailOTP(
            username,
            OTPType.FORGET_PASSWORD
          );
        }),
        finalize(() => {
          this.progressSpinnerService.next(false);
        })
      )
      .subscribe((res) => {
        this._matDialogRef.close({statusCode: 200});
        this._authService.emitUsername(username);
        this._router.navigate([`/validate-otp/forget-password`]);
      });
  }
}
