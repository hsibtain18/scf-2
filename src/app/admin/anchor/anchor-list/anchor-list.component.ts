import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anchor-list',
  templateUrl: './anchor-list.component.html',
  styleUrls: ['./anchor-list.component.scss']
})
export class AnchorListComponent implements OnInit {
  public column: any = [];
  public list = [];
  constructor() { }

  
  ngOnInit(): void {

    this.column = [
      {header:"Header 1",fieldName:"header1"},
      {header:"Header 1",fieldName:"header2"},
      {header:"Header 1",fieldName:"header3"},
      {header:"Header 1",fieldName:"header4"},
      {header:"Header 1",fieldName:"header5"},
      {header:"Header 1",fieldName:"header6"},
    ];
    this.list = [
      {value:"Header 6",fieldName:"header1"},
      {value:"Header 5",fieldName:"header2"},
      {value:"Header 4",fieldName:"header3"},
      {value:"Header 3",fieldName:"header4"},
      {value:"Header 2",fieldName:"header5"},
      {value:"Header 1",fieldName:"header6"},
    ]
  }

}
