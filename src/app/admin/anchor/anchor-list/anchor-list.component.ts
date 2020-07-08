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
  filterObject: any = {
    "TotalRecords": 10, "PageNumber": 0
  }
  constructor(
    private _router: Router,
    private _UserService: UserDataService,
    private route: ActivatedRoute 
  ) {
    console.log(this.route.snapshot.data)
   }


  ngOnInit(): void {


    this.list = [
      { anchor: "Abchor Name 1", Date: "12-25-6201", status: "Pending", col1: "column1" },
      { anchor: "Abchor Name 2", Date: "12-25-6201", status: "Pending", col1: "column1" },
      { anchor: "Abchor Name 3", Date: "12-25-6201", status: "Pending", col1: "column1" },
      { anchor: "Abchor Name 4", Date: "12-25-6201", status: "Pending", col1: "column1" },
      { anchor: "Abchor Name 5", Date: "12-25-6201", status: "Pending", col1: "column1" },
      { anchor: "Abchor Name 6", Date: "12-25-6201", status: "Pending", col1: "column1" },
      { anchor: "Abchor Name 7", Date: "12-25-6201", status: "Pending", col1: "column1" },
      { anchor: "Abchor Name 8", Date: "12-25-6201", status: "Pending", col1: "column1" },
      { anchor: "Abchor Name 9", Date: "12-25-6201", status: "Pending", col1: "column1" },
      { anchor: "Abchor Name 10", Date: "12-25-6201", status: "Pending", col1: "column1" },
      { anchor: "Abchor Name 11", Date: "12-25-6201", status: "Pending", col1: "column1" },
      { anchor: "Abchor Name 12", Date: "12-25-6201", status: "Pending", col1: "column1" },
    ];
    this.column["header"] = ['anchor', "Date", "status", 'col1'];
    this.column["action"] = [
      { ID: 0, Value: "View", ActionValue: "view" },
      { ID: 1, Value: "Approve", ActionValue: "approve" },
      { ID: 2, Value: "Reject", ActionValue: "reject" }
    ];
    this.GetGridData();
  }

  View(anchor) {
    this._router.navigate(['/user/anchor/view/' + 2])
  }

  GetGridData() {
    this._UserService.PostCalls("anchors/search", this.filterObject)
      .then((val: any) => {
        this.list = val;
      })
  }

  openAction(data: any){
    console.log(data);
  }
}
