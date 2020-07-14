import { Injectable, OnInit } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute, Router, ResolveEnd, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from 'src/app/admin/user-data.service';
import { AuthService } from 'src/app/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UIResolverService implements Resolve<any>  {

  private Url = ""
  constructor(private _Service: UserDataService,
    private _service: AuthService,
    private _ActivateRoute: Router,
    private activatedRoute: ActivatedRoute
  ) {
    console.log(location.href)
    let url: string = location.href;
    let number = url.indexOf("/User")
    if (number < 0) {
      this.Url = JSON.parse(sessionStorage.getItem("SCFMenuItem"))[0].URL
    }
    else {
      this.Url = url.slice(number);
    }

  }


  resolve(route: ActivatedRouteSnapshot): Promise<any> {
    let data: any = route.data[0];
    let UIObject = this.getComponentID(this.Url)
    if (data.ParentID == -1) {
      data.MenuID = UIObject.ID
    } else {
      data.MenuID = UIObject.ID
      data.ParentID = UIObject.InnerViewParentId
    }
    const isLogged = JSON.parse(sessionStorage.getItem('SCFUserToken'));
    if (isLogged) {
      return this._Service.PostCalls("utility/getUIComponents", data)
    }




  }

  getComponentID(route: any) {
    let menus = JSON.parse(sessionStorage.getItem("SCFMenuItem"))
    let c = menus.filter((element) => {
      if (route.indexOf(element.URL) == 0)
        return element
    })
    return c[0]
  }

}
