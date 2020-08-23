import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { SharedService } from 'src/app/Shared/services/sharedService';
import { ToastrService } from 'ngx-toastr';
import { loadingConfig } from 'src/app/const/config';

@Component({
  selector: 'app-limit-list',
  templateUrl: './limit-list.component.html',
  styleUrls: ['./limit-list.component.scss']
})
export class LimitListComponent implements OnInit {
  public column: any = [];
  public list = [];
  public constObject: any = [];
  filterObject: any = {
    "TotalRecords": 10, "PageNumber": 0
  }
  public showSpinner: boolean = false;
  public spinnerConfig: any;
  constructor(
    private _router: Router,
    private _UserService: UserDataService,
    private route: ActivatedRoute,
    private _sharedService: SharedService,
    private _toastService: ToastrService
  ) {

  }


  ngOnInit(): void {
    const UI = this.route.snapshot.data.UIdata[0]
    this.constObject["Heading"] = UI.Heading;
    this.constObject["Headers"] = UI.Controls[0].Options.Headers;
    this.constObject["Options"] = UI.Controls[0].Options.ActionItems;
    this.constObject["Api"] = "buyer/search"
    this.constObject["ButtonsArray"] = UI.Controls[0].Controls;
    this.spinnerConfig = loadingConfig;

    // this.GetGridData();
  }

  View(Limit) {
    this._router.navigate(['/User/LimitApproval/View/' + Limit.ID], { state: { ParentID: -2, MenuID: -1, URL: "/User/LimitApproval/View/" } })
  }


  openAction(data: any) {
    if (data.action.ActionItem == "View") {
      this.View(data.data);

    }
    this.showSpinner = true;

    if (data.action.ActionItem == "Reject") {
      this._UserService.PostCalls("limit/reject", { ID: data.data.ID })
        .then(val => {
          this.showSpinner = false;

          this._toastService.success("Rejected Successfully")
          this._sharedService.SetActionStatus(true);
        })
        .catch(err => {
          this.showSpinner = false;
        })

    }
    if (data.action.action == "upload") {
      this._UserService.PostCalls("buyer/upload", { FileData: data["FileData"] })
        .then(val => {
          this.showSpinner = true;

          this._toastService.success("Uploaded Successfully")
          this._sharedService.SetActionStatus(true);

        })
        .catch(err => {
          this.showSpinner = false;
        })
    }

    console.log(data);
  }
}
