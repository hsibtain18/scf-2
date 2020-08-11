import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
 

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot) {
        let UserIdentity = JSON.parse(sessionStorage.getItem('SCFUserIdentity'));


        if(UserIdentity){
            return true
        }

        return false;

    }

}