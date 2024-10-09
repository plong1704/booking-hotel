import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../customer/services/auth.service';
import { debounce, debounceTime, delay, of, tap } from 'rxjs';
import { UserService } from '../customer/services/user.service';
import { ProgressSpinnerService } from '../customer/services/progress-spinner.service';
import { MessageDialogService } from '../customer/services/message-dialog.service';
import { MessageDialogComponent } from '../message-dialog/message-dialog.component';
import { AuthenticationResponse } from '../models/response/model';
export function appInitializer(
  authService: AuthService,
  cookieService: CookieService,
  userService: UserService,
  progressSpinnerService: ProgressSpinnerService
) {
  return () => {
    const haveToken: boolean = cookieService.check('refresh-token');
    if (haveToken) {
      progressSpinnerService.next(true);
      const refreshToken = cookieService.get('refresh-token');
      console.log(refreshToken);
      
      return authService.refreshToken(refreshToken).pipe(
        tap((res) => {
          console.log(res);
          let { accessToken, refreshToken, user } = res;
          userService.nextUser(user);
          authService.emitAccessToken(accessToken);
          authService.storeCookieRefreshToken(refreshToken);
        })
      );
    } else {
      return of(null);
    }
  };
}