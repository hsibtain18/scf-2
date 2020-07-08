import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CryptoKey } from '../../const/config'
@Injectable({
  providedIn: 'root'
})
export class SharedService {



    public getUserData(){
        return  JSON.parse(sessionStorage.getItem("SCFUserIdentity"));
    }


}