import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserDataService } from 'src/app/admin/user-data.service';
import { loadingConfig } from 'src/app/const/config';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() UIObject;
  value: any[] = [];
  ApiRoute: string;
  @Output() Action = new EventEmitter<any>();
  TotalCount: any;
  public header = [];
  public options = [];
  totalCount: number = 0;
  page = 1;
  public showSpinner: boolean = false;
  public spinnerConfig: any;
  filterObject: any = {
    "TotalRecords": 10, "PageNumber": 0
  }
  constructor(
    private _UserService: UserDataService,

  ) { }

  ngOnInit(): void {
    this.spinnerConfig = loadingConfig;

    // this.header = this.col;
    this.options = this.UIObject.Options;
    this.header = this.UIObject.Headers;
    this.ApiRoute = this.UIObject.Api;
    this.GetGridData()
  }

  GetGridData() {
    this.showSpinner = true;

    this._UserService.PostCalls(this.ApiRoute, this.filterObject)
      .then((val: any) => {
        if(!this.filterObject.PageNumber){
          this.value = val.Data
        }
        else{
          this.value = this.value.concat(val.Data)
        }
        this.showSpinner = false;
        this.TotalCount = val.AnchorCount.anchorcount;
      })
      .catch(err => {
        this.showSpinner = false;

      })
  }
  paginateEvent() {
    ++this.filterObject.PageNumber
    this.GetGridData()
  }
  sendAction(col: any, action: any) {
    this.Action.emit({ data: col, action: action })
  }
  checkCondition(data, option) {
    return !eval(option);
  }

}
