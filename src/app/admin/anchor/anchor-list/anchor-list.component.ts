import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { loadingConfig } from 'src/app/const/config';

@Component({
  selector: 'app-anchor-list',
  templateUrl: './anchor-list.component.html',
  styleUrls: ['./anchor-list.component.scss']
})
export class AnchorListComponent implements OnInit {
  public column: any = [];
  public list = [];
  public constObject: any = [];
  filterObject: any = {
    "TotalRecords": 10, "PageNumber": 0
  }
  show = false;
  public showSpinner: boolean = false;
  public spinnerConfig: any;
  totalCount: number;
  constructor(
    private _router: Router,
    private _UserService: UserDataService,
    private route: ActivatedRoute
  ) {

  }


  ngOnInit(): void {
    this.spinnerConfig = loadingConfig;

    const UI = this.route.snapshot.data.UIdata[0]
    this.constObject["Heading"] = UI.Heading;
    this.constObject["Headers"] = UI.Controls[0].Options.Headers;
    this.constObject["Options"] = UI.Controls[0].Options.ActionItems;
    this.constObject["Api"] = "anchors/search"
    // this.GetGridData();
    this.show = true

  }

  View(anchor) {
    this._router.navigate(['/User/Anchor/View/' + anchor.data.ID],{ state:{ParentID:-2,MenuID:-1,URL:"/User/Anchor/View/"}})
  }

  GetGridData() {
    this.showSpinner = true;

    this._UserService.PostCalls("anchors/search", this.filterObject)
      .then((val: any) => {
        this.list = val.Data;
        this.show = true
        this.showSpinner = false;
        this.totalCount = val.AnchorCount.anchorcount;
      })
      .catch(err => {
        this.showSpinner = false;

      })
  }


  openAction(data: any) {
    if (data.action.ActionItem == "View") {
      this.View(data);

    }
    if (data.action.ActionItem == "Reject") {
      this._UserService.PutCalls("anchors/reject", { ID: data.data.ID })
        .then(val => {
          this.GetGridData();
        })

    }

    console.log(data);
  }

  exportCSV() {
    this._UserService.PostCalls("anchors/export", {ID:-1 ,fileType:"text/comma-separated-values"})
      .then((val: any) => {
        console.log("val;")
        var hiddenElement = document.createElement('a');

        hiddenElement.href = 'data:attachment/csv,' + encodeURI(val);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'orders.csv';
        hiddenElement.click();
      })
      .catch(err=>{
        console.log(err);
      })


  }
}
