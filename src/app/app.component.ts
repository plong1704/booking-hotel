
import { Component } from '@angular/core';
import { ProgressSpinnerService } from './customer/services/progress-spinner.service';
import { AuthService } from './customer/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dacn';
  constructor(public progressSpinnerService: ProgressSpinnerService, private _authService: AuthService){
    this._authService.loadGoogleClientLibs()
  }
}
