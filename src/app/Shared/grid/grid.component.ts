import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserDataService } from 'src/app/admin/user-data.service';
import { loadingConfig } from 'src/app/const/config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() UIObject;
   buttonsArray: any [];
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
    private _router: Router
  ) { }

  ngOnInit(): void {
    this.spinnerConfig = loadingConfig;

    // this.header = this.col;
    this.options = this.UIObject.Options;
    this.header = this.UIObject.Headers;
    this.ApiRoute = this.UIObject.Api;
    this.buttonsArray = this.UIObject.ButtonsArray;
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
        this.TotalCount = val.DataCount;
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
  exportCSV() {
    this._UserService.PostCalls("anchors/export", {ID:-1 ,fileType:"text/comma-separated-values"})
      .then((res: any) => {
        console.log(res)
        var hiddenElement = document.createElement('a');

        hiddenElement.href = 'data:attachment/csv,' + encodeURI(res);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'orders.csv';
        hiddenElement.click();
        // if(res.data && res.data.length){
        //   let typedArray = new Uint8Array(res);
        //   const stringChar = typedArray.reduce((data, byte)=> {
        //     return data + String.fromCharCode(byte);
        //     }, '')
        //   let base64String = btoa(stringChar);
        //   let doc = this._domSanitizer.bypassSecurityTrustUrl(`data:application/octet-stream;base64, ${base64String}`) as string;
        //   doc = this._domSanitizer.sanitize(SecurityContext.URL, doc) ;
        //   const downloadLink = document.createElement("a");
        //   const fileName = "List.csv";
        //   downloadLink.href = doc;
        //   downloadLink.download = fileName;
        //   downloadLink.click();
        // }
      })
      .catch(err=>{
        console.log(err);
      })


  }
  NavigateUrl(Url){
    this._router.navigate([Url],{ state:{ParentID:-2,MenuID:-1,URL:Url}});
  }
}
