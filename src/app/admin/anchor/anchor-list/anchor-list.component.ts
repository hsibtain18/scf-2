import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-anchor-list',
  templateUrl: './anchor-list.component.html',
  styleUrls: ['./anchor-list.component.scss']
})
export class AnchorListComponent implements OnInit {
  public Data: any = [];
  public list = [];
  filterObject : any={}
  constructor(
    private _router : Router,
    private _UserService : UserDataService
  ) { }

  
  ngOnInit(): void {


    this.list["data"] = [
      {anchor:"Abchor Name 1",Date:"12-25-6201",status:"Pending",col1:"column1"},
      {anchor:"Abchor Name 2",Date:"12-25-6201",status:"Pending",col1:"column1"},
      {anchor:"Abchor Name 3",Date:"12-25-6201",status:"Pending",col1:"column1"},
      {anchor:"Abchor Name 4",Date:"12-25-6201",status:"Pending",col1:"column1"},
      {anchor:"Abchor Name 5",Date:"12-25-6201",status:"Pending",col1:"column1"},
      {anchor:"Abchor Name 6",Date:"12-25-6201",status:"Pending",col1:"column1"},
      {anchor:"Abchor Name 7",Date:"12-25-6201",status:"Pending",col1:"column1"},
      {anchor:"Abchor Name 8",Date:"12-25-6201",status:"Pending",col1:"column1"},
    ];
    this.list["header"] = ['anchor',"Date","status",'col1'];
  // this.GetGridData();
  }

  View(anchor){
    this._router.navigate(['/user/anchor/view/'+2])
  }
  
  GetGridData(){
    this._UserService.PostCalls("anchors/search",this.filterObject)
    .then((val: any)=>{
      this.list = val;
    })
  }
}
