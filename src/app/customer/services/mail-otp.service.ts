import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { URL_API } from 'src/app/models/constance';
import { ProgressSpinnerService } from './progress-spinner.service';
import { UserService } from './user.service';
import { OTPType } from 'src/app/models/enum';

@Injectable({
  providedIn: 'root'
})
export class MailOTPService {
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private _progressSpinnerService: ProgressSpinnerService,
    private _userService: UserService,
    private _router: Router,
    private ngZone: NgZone,
  ) {
  }

  generateMailOTP(username: string, OTPType: OTPType): Observable<string> {
    let url = URL_API.concat('/api/otp/generate-otp');
    return this.httpClient.get(url, {
      params: new HttpParams({
        fromObject: {
          username: username,
          otpType: OTPType,
        },
      }),
      responseType: 'text',
    });
  }
  
  validateMailOTP(
    username: string,
    OTPNumber: number,
    OTPType: OTPType
  ): Observable<string> {
    let url = URL_API.concat('/api/otp/validate-otp');
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const params = new HttpParams()
      .set('username', username)
      .set('OTPNumber', OTPNumber)
      .set('otpType', OTPType);
    return this.httpClient.get(url, {
      headers: headers,
      params: params,
      responseType: 'text',
    });
  }
}
