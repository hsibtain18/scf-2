import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EncryptDecryptService } from 'src/app/Shared/services/encrypt-decrypt.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { loadingConfig } from 'src/app/const/config';

@Component({
  selector: 'app-change-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  passwordMismatch = false
  private loginFormSubscriber: any
  public showSpinner: boolean = false;
  public spinnerConfig: any;
  constructor(private _encrypt: EncryptDecryptService,
    private _authService: AuthService,
    private _route: Router,
    private toast: ToastrService) {
    this.form = new FormGroup({
      token: new FormControl('test', Validators.required),
      Password: new FormControl('', Validators.required),
      ConfirmPassword: new FormControl('', Validators.required)
    })
  }

  ngOnInit(): void {
    this.spinnerConfig = loadingConfig;
    this.onChanges();
  }
  ngOnDestroy() {
    this.loginFormSubscriber && this.loginFormSubscriber.unsubscribe();
  }

  onChanges(): void {
    this.loginFormSubscriber = this.form.valueChanges.subscribe(val => {
      if (this.form.controls['Password'].value == this.form.controls['ConfirmPassword'].value) {
        this.passwordMismatch = false;
      }
      else {
        this.passwordMismatch = true
      }
    });
  }
  ResetPassword() {

    if (this.form.valid && this.form.controls['Password'].value == this.form.controls['ConfirmPassword'].value) {
      this.showSpinner = true;
      this._authService.PostCalls('login/ChangePassword', this.form.value)
        .then(val => {
          this.toast.success('Password Successfully Changed')
          this.showSpinner = false;
        })
        .catch(err => {
          this.showSpinner = false;

        })
    }
    else {
      this.passwordMismatch = true
    }
  }

}
