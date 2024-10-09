import { Component, ComponentRef, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/customer/services/auth.service';
import { OTPType } from 'src/app/models/enum';
import { finalize, tap } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { ComponentType } from '@angular/cdk/portal';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';
import { MessageDialogService } from 'src/app/customer/services/message-dialog.service';
import { LoginComponent } from '../login/login.component';
import { MailOTPService } from 'src/app/customer/services/mail-otp.service';

@Component({
  selector: 'otp-validation',
  templateUrl: './otp-validation.component.html',
  styleUrls: ['./otp-validation.component.scss'],
})
export class OtpValidationComponent implements OnInit, OnDestroy {
  otpForm: FormGroup;
  username!: string;
  otpTypeString!: string | null;
  otpType!: OTPType;
  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthService,
    private mailOTPService: MailOTPService,
    private _matDialog: MatDialog,
    private _router: Router,
    private _progressSpinnerService: ProgressSpinnerService,
    private _messageDialogService: MessageDialogService
  ) {
    this.otpForm = this._fb.group({
      digit1: ['', Validators.required],
      digit2: ['', Validators.required],
      digit3: ['', Validators.required],
      digit4: ['', Validators.required],
      digit5: ['', Validators.required],
      digit6: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    if (this._authService.registerUsernameCurrentValue) {
      this.username = this._authService.registerUsernameCurrentValue;
    } else {
      window.history.back();
    }
    this.otpTypeString = this._activatedRoute.snapshot.paramMap.get('type');
    if (this.otpTypeString === 'register') {
      this.otpType = OTPType.REGISTER;
    } else if (this.otpTypeString === 'forget-password') {
      this.otpType = OTPType.FORGET_PASSWORD;
    } else {
      this._router.navigate(['/page-not-found']);
    }
  }

  onPaste(event: any) {
    const clipboardData = event.clipboardData || window.Clipboard;
    const pastedData = clipboardData.getData('text/plain').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const inputs: NodeListOf<HTMLInputElement> =
        document.querySelectorAll('input[type="text"]');
      inputs.forEach((input, i) => {
        input.value = pastedData[i];
        this.otpForm.get(`digit` + (i + 1))?.patchValue(pastedData[i]);
      });
    }
    console.log(this.otpForm.value);
  }
  onSubmitMailOTP(username: string, otpForm: FormGroup) {
    this._progressSpinnerService.next(true)
    const otpArr: number[] = Object.values(otpForm.getRawValue());
    let otpNumberText: string = otpArr.join("");
    this.mailOTPService
      .validateMailOTP(username, Number.parseInt(otpNumberText), this.otpType)
      .pipe(
        tap((res) => {
          if (this.otpType === OTPType.REGISTER) {
            this._messageDialogService
              .openSuccessDialog(
                MessageDialogComponent, res
              )
              .afterClosed()
              .subscribe((_) => {
                this._router.navigate(['/home']);
                this._matDialog.open(LoginComponent)
              });
          } else {
            this._matDialog.open(ChangePasswordDialogComponent, {
              data: { username },
            }).afterClosed().subscribe(val => {
              this._router.navigate(['/home'])
            });
          }
        }),
        finalize(() => {
          this._progressSpinnerService.next(false)
        })
      )
      .subscribe();
  }
  resendMailOTP(otpType: OTPType) {
    this._progressSpinnerService.next(true)
    let username = this._authService.registerUsernameCurrentValue;
    this.mailOTPService
      .generateMailOTP(username!, otpType).pipe(
        tap(res => {
          this._messageDialogService.openSuccessDialog(MessageDialogComponent, res)
        }),
        finalize(() => {
          this._progressSpinnerService.next(false)
        })
      )
      .subscribe();
  }
  ngOnDestroy(): void {
    this._authService.emitUsername(null);
  }
}
