import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EncryptDecryptService } from 'src/app/Shared/services/encrypt-decrypt.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  form: FormGroup;
  constructor(private _encrypt: EncryptDecryptService,
    private _authService: AuthService,
    private _route: Router,
    private toast: ToastrService) {
    this.form = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  ngOnInit(): void {
  }



  forgotPassword() {
    if (this.form.valid) {
      this._authService.PostCalls('login/forgot', this.form.value)
        .then(val => {
          this.toast.success("Emailed Send")
          this._route.navigate(['/auth/login']);
        })
    }
  }
}
