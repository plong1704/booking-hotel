import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, of, throwError } from 'rxjs';
import { AuthService } from '../customer/services/auth.service';
import { Router } from '@angular/router';
import { MessageDialogService } from '../customer/services/message-dialog.service';
import { ProgressSpinnerService } from '../customer/services/progress-spinner.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root',
})
export class JWTInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private _messageDialogService: MessageDialogService,
    private _progressSpinnerService: ProgressSpinnerService,
    private _router: Router
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let accessToken = this.authService.accessTokenVal;
    let reqTemp = req;
    if (accessToken) {
      let token = accessToken.token;
      reqTemp = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token),
      });
    }
    let dialogRef: MatDialogRef<any>;
    return next.handle(reqTemp).pipe(
      catchError((errorRes: any) => {
        console.log("JWT erorr response");
        
        if (errorRes.error.message) {
          dialogRef = this._messageDialogService.openDangerDialog(
            MessageDialogComponent,
            errorRes.error.message
            );
          } else {
            dialogRef = this._messageDialogService.openDangerDialog(
              MessageDialogComponent,
              errorRes.error
              );
            }
            console.log(1);
        return throwError(() => errorRes)
      })
    );
  }
}
