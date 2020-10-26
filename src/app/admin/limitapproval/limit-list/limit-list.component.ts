import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { SharedService } from 'src/app/Shared/services/sharedService';
import { ToastrService } from 'ngx-toastr';
import { loadingConfig } from 'src/app/const/config';
import * as XLSX from 'xlsx'
import { DialogService } from 'src/app/Shared/services/dialog.service';

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
    private _toastService: ToastrService,
    private _modalCustomService: DialogService,
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
          // this.showSpinner = false;

          this._toastService.success("Rejected Successfully")
          this._sharedService.SetActionStatus(true);
        })
        .catch(err => {
          this.showSpinner = false;
        })

    }
    if (data.action.action == "upload") {
      this._UserService.PostFiles("buyer/upload", data["FileData"])
        .then((val: any) => {
          // this.showSpinner = true;
          if (val.data) {
            // this._modalCustomService.OpenTimedDialog({ heading: val.message, type: 4 });
            this._toastService.error(val.message)
            let wb = XLSX.utils.book_new()
            for (let sheet of val.data.Sheets) {
              let ws = XLSX.utils.aoa_to_sheet(sheet.data);
              XLSX.utils.book_append_sheet(wb, ws, sheet.name);
            }
            XLSX.writeFile(wb, "ErrorFile.xls");
          }
          else {
            this._toastService.success("Uploaded successfully.")
            this._sharedService.SetActionStatus(true);
          }
        })
        .catch(err => {
          this.showSpinner = false;
        })
    }

    if (data.action.action == "template") {
      let link = document.createElement("a");
      link.download = "Buyer Detail Template";
      link.href = "assets/downloadFile/template.xlsx";
      link.click();
    }
    //console.log(data);
  }
}
