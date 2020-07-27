import { Injectable, OnInit } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute, Router, ResolveEnd, UrlTree, UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { UserDataService } from 'src/app/admin/user-data.service';
import { AuthService } from 'src/app/auth/auth.service';
import { UIService } from 'src/app/admin/ui.service';

@Injectable({
  providedIn: 'root'
})
export class UIResolverService implements Resolve<any>  {

  private Url = ""
  constructor(private _UIService: UIService, private _router: Router
  ) {
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
    const navigation = this._router.getCurrentNavigation();
    let data: any = navigation.extras.state
    let state = ""
    let num = this.Url.split('/').length
    if (!data) {
      state = "refreshed"
      data = {};
      data.URL = this.Url

    } else {
      state = "unrefreshed"
    }
    let UIObject = this.getComponentID(data)
    if (data.ParentID == -1 && state == 'unrefreshed') {
      data.MenuID = UIObject.ID;
    }
    if (data.ParentID != -1 && state == 'unrefreshed') {
      data.MenuID = UIObject.ID
      data.ParentID = UIObject.InnerViewParentId
    }
    if (!data.ParentID && state == 'refreshed' && num == 3) {
      data.MenuID = UIObject.ID;
      data.ParentID = -1 
    }
    if (!data.ParentID && state == 'refreshed' && num != 3) {
      data.MenuID = UIObject.ID
      data.ParentID = UIObject.InnerViewParentId
    }
    const isLogged = JSON.parse(sessionStorage.getItem('SCFUserToken'));
    if (isLogged) {
      return this._UIService.GetUICalls("utility/getUIComponents", data)
    }
  }

  getComponentID(route: any) {
    let menus = JSON.parse(sessionStorage.getItem("SCFMenuItem"))
    let c = menus.filter((element) => {
      if ((element.ID == route.MenuID) || (route.URL.indexOf(element.URL) == 0))
        return element
    })
    return c[0]
  }

}
