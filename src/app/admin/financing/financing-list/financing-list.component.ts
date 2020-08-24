import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { SharedService } from 'src/app/Shared/services/sharedService';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-financing-list',
  templateUrl: './financing-list.component.html',
  styleUrls: ['./financing-list.component.scss']
})
export class FinancingListComponent implements OnInit {

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
    private _toaster: ToastrService,
    private _sharedService: SharedService,
    private _toastService: ToastrService
  ) {

  }


  ngOnInit(): void {
    const UI = this.route.snapshot.data.UIdata[0]
    this.constObject["Heading"] = UI.Heading;
    this.constObject["Headers"] = UI.Controls[0].Options.Headers;
    this.constObject["Options"] = UI.Controls[0].Options.ActionItems;
    this.constObject["Api"] = "financial/search"
    this.constObject["ButtonsArray"] = UI.Controls[0].Controls;

    // this.GetGridData();
  }

  View(Limit) {
    this._router.navigate(['/User/Financing/View/' + Limit.ID], { state: { ParentID: -2, MenuID: -1, URL: "/User/Financing/View/" } })
  }


  openAction(data: any) {
    if (data.action.ActionItem == "View") {
      this.View(data.data);

    }
    if (data.action.ActionItem == "Reject") {
      this._UserService.PostCalls("limit/reject", { ID: data.data.ID })
        .then(val => {
          this._toastService.success("Rejected Successfully")

          this._sharedService.SetActionStatus(true);
        })

    }
    if (data.action.action == "upload") {
      this._UserService.PostCalls("buyer/upload", { FileData: data["FileData"] })
        .then(val => {
        })

    }

    //console.log(data);
  }
}
