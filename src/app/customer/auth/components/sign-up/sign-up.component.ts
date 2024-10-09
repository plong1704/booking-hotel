declare const FB: any;
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  timer,
  tap,
  timeout,
  delay,
  concatMap,
  of,
  Observable,
  switchMap,
  finalize,
  catchError,
  throwError,
} from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { AuthService } from 'src/app/customer/services/auth.service';
import { NUMBER_REGEX, TEXT_SPACE_REGEX } from 'src/app/models/constance';
import { MessageDialogComponent } from 'src/app/message-dialog/message-dialog.component';
import { ProgressBarService } from 'src/app/customer/services/progress-bar.service';
import { Router } from '@angular/router';
import { OAuthProvider, OTPType } from 'src/app/models/enum';
import { SignUpRequest, SocialUserRequest } from 'src/app/models/request/model';
// import { ChangePasswordDialogComponent } from '../dialogs/change-password-dialog/change-password-dialog.component';
import {
  APIResponse,
  AuthenticationResponse,
  SocialUserResponse,
} from 'src/app/models/response/model';
import { UserService } from 'src/app/customer/services/user.service';
import { MessageDialogService } from 'src/app/customer/services/message-dialog.service';
import { ProgressSpinnerService } from 'src/app/customer/services/progress-spinner.service';
import { MailOTPService } from 'src/app/customer/services/mail-otp.service';
export function matchingPasswordsValidator(
  controlName: string,
  matchingControlName: string
) {
  return (formGroup: FormGroup) => {
    const control: FormControl = formGroup.controls[controlName] as FormControl;
    const matchingControl: FormControl = formGroup.controls[
      matchingControlName
    ] as FormControl;

    // set error on matching control if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ notMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

export function passwordValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (control.value) {
    const regex =
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?=\S+$).{8,20}$/;
    const valid = regex.test(control.value);
    return valid ? null : { invalidPassword: true };
  }
  return null;
}
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  providers: [ProgressBarService],
})
export class SignUpComponent implements AfterViewInit {
  @ViewChild('signUp')
  signUpEleRef!: ElementRef;
  isSuccessSignUp = false;
  signUpFG!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _matDialog: MatDialog,
    public progressBarService: ProgressBarService,
    private _router: Router,
    private _progressSpinnerService: ProgressSpinnerService,
    private _messageDialogService: MessageDialogService,
    private _userService: UserService,
    private _mailOTPService: MailOTPService
  ) {
    this._authService.loadGoogleClientLibs();
    this.signUpFG = this._fb.group({
      username: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, passwordValidator]),
      ],
      confirmPassword: [
        '',
        Validators.compose([Validators.required, passwordValidator]),
      ],
      fullName: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
    });
  }
  ngOnInit(): void {
    (window as any).signInWithGoogleCallback =
      this.signInWithGoogleCallback.bind(this);
    this.signUpFG.valueChanges.subscribe((v) => console.log(v));
  }
  ngAfterViewInit(): void {}
  get usernameControl(): FormControl {
    return this.signUpFG.get('username') as FormControl;
  }
  get passwordControl(): FormControl {
    return this.signUpFG.get('password') as FormControl;
  }
  get confirmPasswordControl(): FormControl {
    return this.signUpFG.get('confirmPassword') as FormControl;
  }
  get fullNameControl(): FormControl {
    return this.signUpFG.get('fullName') as FormControl;
  }
  get phoneControl(): FormControl {
    return this.signUpFG.get('phone') as FormControl;
  }

  onClickSignUp(signUpFormValue: SignUpRequest) {
    this._progressSpinnerService.next(true);
    /* Check exist username and valid password */
    this._authService
      .validateSignUp(signUpFormValue)
      .pipe(
        switchMap((res) => {
          /* Call API to generate Mail OTP */
          return this._mailOTPService.generateMailOTP(
            this.usernameControl.value,
            OTPType.REGISTER
          );
        }),
        tap((res) => {
          let dialogRef = this._messageDialogService.openSuccessDialog(
            MessageDialogComponent,
            res
          );
          dialogRef.afterClosed().subscribe((val) => {
            this._authService.emitUsername(this.usernameControl.value);
            this._router.navigate([`/validate-otp/register`]);
          });
        }),
        finalize(() => {
          this._progressSpinnerService.next(false);
        })
      )
      .subscribe();
  }
  signInWithGoogleCallback(response: any) {
    this._authService.signInGoogleCallBack(response);
  }
  signInWithFacebook(): void {
    FB.login(
      (response: any) => {
        if (response.status === 'connected') {
          const accessToken = response.authResponse.accessToken;
          const userID = response.authResponse.userID;
          FB.api(
            `/${userID}`,
            'GET',
            { access_token: accessToken, fields: 'name,email,picture' },
            (user: any) => {
              const { email, id, name, picture } = user;
              const socialUserRequest: SocialUserRequest = {
                email: email,
                name: name,
                photoUrl: picture.data.url,
                provider: OAuthProvider.FACEBOOK,
                id: id,
              };
              this._authService
                .signInWithSocial(socialUserRequest)
                .subscribe((res) => {});
            }
          );
        }
      },
      { scope: 'email' }
    );
  }
  openSignInDialog() {
    this._matDialog.open(LoginComponent);
  }
  ngOnDestroy() {}
}
