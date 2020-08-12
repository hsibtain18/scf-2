import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CryptoKey } from '../../const/config'
import { UserDataService } from 'src/app/admin/user-data.service';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

constructor(private _user : UserDataService){}

    public getUserData(){
        return  JSON.parse(sessionStorage.getItem("SCFUserIdentity"));
    }

    public Logout(){
      this._user.PostCalls("login/logout",{})
      .then(val=>{
        
      })
    }
}