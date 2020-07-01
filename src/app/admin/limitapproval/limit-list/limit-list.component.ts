import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-limit-list',
  templateUrl: './limit-list.component.html',
  styleUrls: ['./limit-list.component.scss']
})
export class LimitListComponent implements OnInit {

  public column: any = [];
  public list = [];
  constructor(
    private _router: Router
  ) { }


  ngOnInit(): void {

    this.column = [
      { header: "Header 1", fieldName: "header1" },
      { header: "Header 1", fieldName: "header2" },
      { header: "Header 1", fieldName: "header3" },
      { header: "Header 1", fieldName: "header4" },
      { header: "Actions", fieldName: "header5" },
    ];
    this.list = [
      { ID: 0, name: "asc", name2: "name2", name3: "name3" }
    ]
  }

  View(anchor) {
    this._router.navigate(['/user/limitApprover/view/' + 2])
  }

}
