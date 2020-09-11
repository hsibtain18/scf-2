import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EncryptDecryptService } from 'src/app/Shared/services/encrypt-decrypt.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;

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
  }

  ResetPassword() {
    if (this.form.valid && this.form.controls['Password'].value == this.form.controls['ConfirmPassword'].value) {
      this._authService.PostCalls('login/ChangePassword', this.form.value)
        .then(val => {
          this.toast.success('Password Successfully Changed')
        })
        .catch(err => {

        })
    }
    else {

    }
  }

}
