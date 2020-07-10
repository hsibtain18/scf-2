import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EncryptDecryptService } from 'src/app/Shared/services/encrypt-decrypt.service';
import { AuthService } from '../auth.service';
import { loadingConfig } from '../../const/config'
import { Router } from '@angular/router';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public loginFailure: boolean = false;
  private loginFormSubscriber: any
  public showSpinner: boolean = false;
  public spinnerConfig: any;

  constructor(private _encrypt: EncryptDecryptService,
    private _authService: AuthService,
    private  _route :Router ) {

    this.loginForm = new FormGroup({
      UserName: new FormControl(null, [Validators.required]),
      Password: new FormControl(null, [Validators.required]),
    })

  }

  ngOnInit(): void {
    this.spinnerConfig = loadingConfig;


  }
  ngOnDestroy() {
    this.loginFormSubscriber && this.loginFormSubscriber.unsubscribe();
  }

  onChanges(): void {
    this.loginFormSubscriber = this.loginForm.valueChanges.subscribe(val => {
      if (val && Object.keys(val).length) {
        this.loginFailure = false;
      }
    });
  }
   Login() {
    this.showSpinner = true;
    let user = this._encrypt.encryptData(this.loginForm.value);
    this._authService.PostCalls("login/token", user)
      .then((val: any) => {
        document.getElementsByClassName('btn')[0]["style"].background=val.UserAccount.color;
        this.showSpinner = false;

        if (val.Status == 201) {

        }
        else{
          let token = this._encrypt.decryptData(val.access_token);
          sessionStorage.setItem("SCFMenuItem",JSON.stringify(val.UserAccount.SideMenu));
          let sideMenu : any = val.UserAccount.SideMenu;
          delete val.UserAccount.SideMenu;
          sessionStorage.setItem("SCFUserIdentity",JSON.stringify(val.UserAccount));
          sessionStorage.setItem("SCFUserToken",JSON.stringify(token.access_token));
          //this._route.navigate(['/user/anchor'])
          this._route.navigateByUrl(sideMenu[0].URL);
          console.log(sideMenu[0]);
        }
      })
      .catch(error => {
        this.showSpinner = false;
        console.log(error);
      })
  }
}
