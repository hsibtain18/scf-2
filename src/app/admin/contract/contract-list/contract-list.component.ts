import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { SharedService } from 'src/app/Shared/services/sharedService';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/Shared/services/dialog.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['./contract-list.component.scss']
})
export class ContractListComponent implements OnInit {

  public column: any = [];
  public list = [];
  public constObject: any = [];
  filterObject: any = {
    "TotalRecords": 10, "PageNumber": 0
  }
  constructor(
    private _router: Router,
    private _UserService: UserDataService,
    private route: ActivatedRoute,
    private _sharedService: SharedService,
    private _toastService: ToastrService,
    private _dialog: DialogService
  ) {

  }


  ngOnInit(): void {
    const UI = this.route.snapshot.data.UIdata[0]
    this.constObject["Heading"] = UI.Heading;
    this.constObject["Headers"] = UI.Controls[0].Options.Headers;
    this.constObject["Options"] = UI.Controls[0].Options.ActionItems;
    this.constObject["Api"] = "contractpayment/search"
    this.constObject["ButtonsArray"] = UI.Controls[0].Controls;

    // this.GetGridData();
  }

  View(Limit) {
    this._router.navigate(['/User/Contract/View/' + Limit.ID], { state: { ParentID: -2, MenuID: -1, URL: "/User/Contract/View/" } })
  }


  openAction(data: any) {
    if (data.action.ActionItem == "View") {
      this.View(data.data);

    }
    if (data.action.ActionItem == "Reject") {
      this._UserService.PostCalls("limit/reject", { ID: data.data.ID })
        .then(val => {
          this._toastService.success("Rejected Successfully")

          this._sharedService.SetActionStatus(true)
        })

    }
    if (data.action.ActionItem == "Deliver") {
      this._UserService.PostCalls("contractpayment/delivered", { ID: data.data.ID })
        .then((val: any) => {
          if (val.Status == 201) {
            this._dialog.OpenTimedDialog({ heading: val.Message, type: 2 })

          } else {
            this._toastService.success("Delivered Successfully")
            this._sharedService.SetActionStatus(true)

          }

        })
    }
    if (data.action.ActionItem == "Approve") {
      this._UserService.PostCalls("contractpayment/approved", { ID: data.data.ID })
        .then((val: any) => {
          if (val.Status == 201) {
            this._dialog.OpenTimedDialog({ heading: val.Message, type: 2 })

          } else {
            this._toastService.success("Approved Successfully")
            this._sharedService.SetActionStatus(true)

          }

        })
    }
    if (data.action.ActionItem == "Reject") {
      this._UserService.PostCalls("contractpayment/rejected", { ID: data.data.ID })
        .then((val: any) => {
          if (val.Status == 201) {
            this._dialog.OpenTimedDialog({ heading: val.Message, type: 2 })

          } else {
            this._toastService.success("Rejected Successfully")
            this._sharedService.SetActionStatus(true)

          }
        })
    }
  }
}