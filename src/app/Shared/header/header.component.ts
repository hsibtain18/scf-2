import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/sharedService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userDetail: any = []
  constructor(public _sharedService: SharedService,
    private _router: Router) { }

  ngOnInit(): void {
    this.userDetail = this._sharedService.getUserData();
  }
  Logout() {
    this._sharedService.Logout();
    this._router.navigate(["/auth/login"])
  }
}
