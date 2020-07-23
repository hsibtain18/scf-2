import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../user-data.service';

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
  constructor(
    private _router: Router,
    private _UserService: UserDataService,
    private route: ActivatedRoute
  ) {

  }


  ngOnInit(): void {
    const UI = this.route.snapshot.data.UIdata[0]
    this.constObject["Heading"] = UI.Heading;
    this.constObject["Headers"] = UI.Controls[0].Options.Headers;
    this.constObject["Options"] = UI.Controls[0].Options.ActionItems;
    this.GetGridData();
  }

  View(anchor) {
    this._router.navigate(['/User/Anchor/View/' + anchor.data.ID])
  }

  GetGridData() {
    this._UserService.PostCalls("anchors/search", this.filterObject)
      .then((val: any) => {
        this.list = val;
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

  exportCSV(){
    // this._UserService.PostCalls("")

    // var hiddenElement = document.createElement('a');

    //             hiddenElement.href = 'data:attachment/csv,' + encodeURI(data._body);
    //             hiddenElement.target = '_blank';
    //             hiddenElement.download = 'orders.csv';
    //             hiddenElement.click();
  }
}
