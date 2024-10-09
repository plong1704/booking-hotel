import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from 'src/app/customer/auth/components/login/login.component';
import { UserService } from 'src/app/customer/services/user.service';
import { UserDTO } from 'src/app/models/model';
type FieldType = 'fullName' | 'phone' | 'gender' | 'password' | 'dob';
export function matchPassword(): ValidatorFn {
  return (control: AbstractControl) => {
    const password = control.get('newPassword1st') as FormControl;
    const confirmPassword = control.get('newPassword2nd') as FormControl;
    if (password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  };
}
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user$!: Observable<UserDTO | null | any>;
  modifyState = {
    fullName: false,
    email: false,
    gender: false,
    dob: false,
    phone: false,
    password: false,
  };
  userFG!: FormGroup;
  a!: any[];
  passwordChangeFG = this._fb.group(
    {
      curPassword: ['', Validators.required],
      newPassword1st: ['', Validators.required],
      newPassword2nd: ['', Validators.required],
    },
    {
      validators: [Validators.required, matchPassword],
    }
  );
  constructor(private _fb: FormBuilder, private _userSerivce: UserService, private _route: ActivatedRoute) {
    this.user$ = _userSerivce.user$;
    let currUser = _userSerivce.userValue;
    if (currUser) {
      const { fullName, phone, email, gender, dob } = currUser;
      this.userFG = this._fb.group({
        fullName: [fullName, Validators.required],
        gender: [gender, Validators.required],
        phone: [phone, Validators.required],
        email: [email, Validators.required],
        dob: [dob, Validators.required],
        password: this._fb.group(
          {
            curPassword: ['', Validators.required],
            newPassword1st: ['', Validators.required],
            newPassword2nd: ['', Validators.required],
          },
          {
            validators: [Validators.required, matchPassword],
          }
        ),
      });
      this.a = [
        {
          label: 'Họ tên',
          fieldName: 'fullName',
          value: fullName,
          canEdit: true,
          isEdit: false,
          type: 'input',
          abstractControl: 'control',
        },
        {
          label: 'Giới tính',
          fieldName: 'gender',
          value: gender,
          isEdit: false,
          canEdit: true,
          type: 'radio',
          abstractControl: 'control',
          options: [
            {
              label: 'Nam',
              value: 'MALE',
            },
            {
              label: 'Nữ',
              value: 'FAMALE',
            },
          ],
        },
        {
          label: 'Email',
          fieldName: 'email',
          value: email,
          isEdit: false,
          canEdit: false,
          type: 'input',
          abstractControl: 'control',
        },
        {
          label: 'Mật khẩu',
          value: '*********',
          isEdit: false,
          canEdit: true,
          abstractControl: 'group',
          fieldName: 'password',
          group: [
            {
              label: 'Mật khẩu',
              fieldName: 'curPassword',
            },
            {
              label: 'Nhập lại mật khẩu',
              fieldName: 'newPassword1st',
            },
            {
              label: 'Nhập lại mật khẩu',
              fieldName: 'newPassword2nd',
            },
          ],
        },
        {
          label: 'Số điện thoại',
          fieldName: 'phone',
          value: phone,
          canEdit: true,
          isEdit: false,
          type: 'input',
          abstractControl: 'control',
        },
        {
          label: 'Ngày sinh',
          fieldName: 'dob',
          value: phone,
          canEdit: true,
          isEdit: false,
          type: 'date',
          abstractControl: 'control',
        },
      ];
    }
  }
  ngOnInit(): void {
    this.user$.subscribe((user) => {
      console.log(user);
    });
  }
  onClickEdit(field: any) {
    field.isEdit = !field.isEdit;
  }
  cancelEdit(field: any) {
    field.isEdit = !field.isEdit;
    let currUser: any = this._userSerivce.userValue;
    this.userFG.get(field.fieldName)?.patchValue(currUser[field.fieldName]);
  }
  onClickUpdate(field: any) {
    field.isEdit = !field.isEdit;
    let val = this.userFG.get(field.fieldName)!.value;
    let currUser: any = this._userSerivce.userValue;
    currUser[field.fieldName] = val;
    this._userSerivce.nextUser(currUser);
  }
}
