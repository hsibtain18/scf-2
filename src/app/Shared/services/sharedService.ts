import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { CryptoKey } from '../../const/config'
import { UserDataService } from 'src/app/admin/user-data.service';
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private ActionStatus = new Subject<any>();

  constructor(private _user: UserDataService) { }

  public getUserData() {
    return JSON.parse(sessionStorage.getItem("SCFUserIdentity"));
  }
  GetActionStatus(): Observable<any> {
    return this.ActionStatus.asObservable();
  }
  SetActionStatus(ActionsStatusValue) {
    this.ActionStatus.next(ActionsStatusValue)
  }
  ClearActionStatus(){
    this.ActionStatus.next();
  }
  public Logout() {
    this._user.PostCalls("login/logout", {})
      .then(val => {

      })
  }
}