declare const FB: any;
import jwt_decode from 'jwt-decode';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable, NgZone, OnInit } from '@angular/core';
import {
  URL_API,
  USER_AVATAR_PATH,
  USER_COVER_PATH,
} from 'src/app/models/constance';
import {
  BehaviorSubject,
  Observable,
  catchError,
  finalize,
  map,
  of,
  tap,
  throwError,
} from 'rxjs';
import { OAuthProvider, OTPType } from 'src/app/models/enum';
import { AuthenticationResponse } from 'src/app/models/response/model';
import {
  SignInRequest,
  SignUpRequest,
  ForgetPasswordRequest,
  SocialUserRequest,
} from 'src/app/models/request/model';
import { JWTDTO } from 'src/app/models/model';
import { CookieService } from 'ngx-cookie-service';
import { ProgressSpinnerService } from './progress-spinner.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      responseType: 'json',
    }),
    params: new HttpParams(),
  };
  private usernameBSub!: BehaviorSubject<string | null>;
  username$!: Observable<string | null>;
  private accessTokenBehaviorSubject!: BehaviorSubject<JWTDTO | null>;
  accessToken$!: Observable<JWTDTO | null>;
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private _progressSpinnerService: ProgressSpinnerService,
    private _userService: UserService,
    private _router: Router,
    private ngZone: NgZone,
  ) {
    this.usernameBSub = new BehaviorSubject<string | null>(null);
    this.username$ = this.usernameBSub.asObservable();

    this.accessTokenBehaviorSubject = new BehaviorSubject<JWTDTO | null>(null);
    this.accessToken$ = this.accessTokenBehaviorSubject.asObservable();
  }
  ngOnInit(): void {}

  emitUsername(username: string | null): void {
    this.usernameBSub.next(username);
  }
  emitAccessToken(jwt: JWTDTO | null): void {
    this.accessTokenBehaviorSubject.next(jwt);
  }
  get accessTokenVal(): JWTDTO | null {
    return this.accessTokenBehaviorSubject.value;
  }
  get registerUsernameCurrentValue(): string | null {
    return this.usernameBSub.value;
  }
  get refreshTokenFromCookie() {
    return this.cookieService.get('refresh-token');
  }

  get usernameVal() {
    return this.usernameBSub.value;
  }

  deleteRefreshTokenFromCookie() {
    this.cookieService.delete("refresh-token", "/")
  }

  signIn(signInRequest: SignInRequest): Observable<AuthenticationResponse> {
    let url = URL_API.concat('/api/auth/sign-in');
    return this.httpClient
      .post<AuthenticationResponse>(url, signInRequest, {
        responseType: 'json',
      })
      .pipe(
        map((res) => {
          let { user, accessToken, refreshToken } = res;
          user.avatarUrl = USER_AVATAR_PATH + `${user.avatarUrl}`;
          user.coverUrl = USER_COVER_PATH + `${user.coverUrl}`;
          this._userService.nextUser(user);
          this.emitAccessToken(accessToken);
          this.storeCookieRefreshToken(refreshToken);
          return res;
        })
      );
  }

  signInWithSocial(
    socialUser: SocialUserRequest
  ): Observable<AuthenticationResponse> {
    let url = URL_API.concat('/api/auth/social-sign-in');
    return this.httpClient
      .post<AuthenticationResponse>(url, socialUser, this.httpOptions)
      .pipe(
        tap((res) => {
          const { user, accessToken, refreshToken } = res;
          this._progressSpinnerService.next(false);
          this._userService.nextUser(user);
          this.emitAccessToken(accessToken);
          this.storeCookieRefreshToken(refreshToken);
          this._router.navigate(['/home']);
        })
      );
  }

  signInGoogleCallBack(response: any): Observable<AuthenticationResponse> {
    const credential = response.credential;
    const decodedToken: any = jwt_decode(credential);
    const socialUserRequest: SocialUserRequest = {
      email: decodedToken.email,
      firstName: decodedToken.family_name,
      lastName: decodedToken.given_name,
      name: decodedToken.name,
      photoUrl: decodedToken.picture,
      provider: OAuthProvider.GOOGLE,
      id: decodedToken.sub,
    };
    return this.signInWithSocial(socialUserRequest);
  }

  signInFacebookCallBack(dialogRef: MatDialogRef<any>): void {
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
              this.signInWithSocial(socialUserRequest).subscribe(() => {
                this.ngZone.run(() => {
                  dialogRef.close();
                });
              });
            }
          );
        }
      },
      { scope: 'email' }
    );
  }
  
  signOut(refreshToken: string): Observable<boolean> {
    return this.httpClient.post<boolean>(
      `${URL_API}/api/auth/revoke-token`,
      refreshToken,
      this.httpOptions
    ).pipe(
      tap(isRevoke => {
        if (isRevoke) {
          this.emitAccessToken(null);
          this.deleteRefreshTokenFromCookie();
          this._userService.nextUser(null);
          this._router.navigate(['/home']);
        }
      })
    );
  }

  storeCookieRefreshToken(refreshToken: JWTDTO) {
    const { token, tokenExpirationDate } = refreshToken;
    this.cookieService.set(
      'refresh-token',
      token,
      tokenExpirationDate,
      '/',
      undefined,
      true,
      'Strict'
    );
  }

  refreshToken(refreshToken: string): Observable<AuthenticationResponse> {
    const url = `${URL_API}/api/auth/refresh-token`;
    return this.httpClient
      .get<AuthenticationResponse>(url, {
        params: new HttpParams({
          fromObject: {
            refreshToken: refreshToken,
          },
        }),
        responseType: 'json',
      })
      .pipe(
        map((res) => {
          let { user } = res;
          user.avatarUrl = USER_AVATAR_PATH + `${user.avatarUrl}`;
          user.coverUrl = USER_COVER_PATH + `${user.coverUrl}`;
          return res;
        }),
        catchError((errorRes: any) => {
          this.deleteRefreshTokenFromCookie()
          window.location.href = "/home"
          return throwError(() => errorRes)
        }),
        finalize(() => {
          this._progressSpinnerService.next(false);
        }),
      );
  }

  validateSignUp(signUpFormRequest: SignUpRequest): Observable<string> {
    let url = URL_API.concat('/api/auth/validate-sign-up');
    return this.httpClient.post(url, signUpFormRequest, {
      responseType: 'text',
    });
  }


  validateUser(username: string): Observable<string> {
    let url = URL_API.concat(`/api/auth/validate-user`);
    return this.httpClient.post(url, username, {
      params: new HttpParams({
        fromObject: {
          username: username,
        },
      }),
      responseType: 'text',
    });
  }

  changePassword(
    forgetPasswordRequest: ForgetPasswordRequest
  ): Observable<string> {
    let url = URL_API.concat(`/api/auth/change-password`);
    return this.httpClient.post(url, forgetPasswordRequest, {
      responseType: 'text',
    });
  }

  public loadGoogleClientLibs(): void {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

}
