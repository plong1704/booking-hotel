import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SUCCESS_ALERT_TITLE, SUCCESS_ALERT_ICON, FAIL_ALERT_TITLE, FAIL_ALERT_ICON } from 'src/app/models/constance';

@Injectable({
  providedIn: 'root'
})
export class MessageDialogService {
  showSuccess(arg0: string) {
    throw new Error('Method not implemented.');
  }
  showError(arg0: string) {
    throw new Error('Method not implemented.');
  }
  constructor(private _matDialog: MatDialog) { }
  openMessageDialog(
    component: ComponentType<any>,
    title: string,
    text: string, 
    icon: string
  ): MatDialogRef<any> {
    return this._matDialog.open(component, {
      data: {
        title,
        text,
        icon
      },
    });
  }
  openSuccessDialog(
    component: ComponentType<any>,
    text: string, 
  ): MatDialogRef<any> {
    return this._matDialog.open(component, {
      data: {
        title: SUCCESS_ALERT_TITLE,
        text,
        icon: SUCCESS_ALERT_ICON
      },
    });
  }
  openDangerDialog(
    component: ComponentType<any>,
    text: string, 
  ): MatDialogRef<any> {
    return this._matDialog.open(component, {
      data: {
        title: FAIL_ALERT_TITLE,
        text,
        icon: FAIL_ALERT_ICON
      },
    });
  }
}
