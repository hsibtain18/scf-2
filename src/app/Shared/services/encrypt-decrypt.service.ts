import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CryptoKey } from '../../const/config'
@Injectable({
  providedIn: 'root'
})
export class EncryptDecryptService {

  constructor() { }

  public encryptData(obj: any) {
    if(obj!=null){
      let encrypt: any = {}
      Object.keys(obj).forEach(function (key) {
        let value = {};
        value[key] = obj[key];
        value['Identifier'] = Date.now()
        encrypt[key] = CryptoJS.AES.encrypt(JSON.stringify(value), CryptoKey).toString();
      });
      return encrypt
    }
  }
}
