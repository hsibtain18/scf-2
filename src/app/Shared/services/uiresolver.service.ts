import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from 'src/app/admin/user-data.service';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UIResolverService  implements Resolve<any> {

  constructor(private _Service : UserDataService,
    private  _service : AuthService
    ) { }
  resolve(route: ActivatedRouteSnapshot): Promise<any> {  

    const isLogged = JSON.parse(sessionStorage.getItem('SCFUserToken'));
    console.log(route)
    if (isLogged) {
      return this._Service.PostCalls("utility/getUIComponents",{menuid:1, parentid:1})
    }



    
  } 

}
