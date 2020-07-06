import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/sharedService';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  userDetail : any = []
  constructor(private _sharedService : SharedService) { }

  ngOnInit(): void {
    this.userDetail = this._sharedService.getUserData();
  }

}
