import { Component, OnInit ,SecurityContext} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { loadingConfig } from 'src/app/const/config';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'src/app/Shared/services/sharedService';

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
    private route: ActivatedRoute,
    private _domSanitizer: DomSanitizer,
    private _sharedService : SharedService
  ) {

  }


  ngOnInit(): void {
    this.spinnerConfig = loadingConfig;

    const UI = this.route.snapshot.data.UIdata[0]
    this.constObject["Heading"] = UI.Heading;
    this.constObject["Headers"] = UI.Controls[0].Options.Headers;
    this.constObject["Options"] = UI.Controls[0].Options.ActionItems;
    this.constObject["Api"] = "anchors/search"
    this.constObject["ButtonsArray"] =  UI.Controls[0].Controls;
    // this.GetGridData();
    this.show = true

  }

  View(anchor) {
    this._router.navigate(['/User/Anchor/View/' + anchor.data.ID],{ state:{ParentID:-2,MenuID:-1,URL:"/User/Anchor/View/"}})
  }


  getButtonsArray(){

  }
  openAction(data: any) {
    if (data.action.ActionItem == "View") {
      this.View(data);

    }
    if (data.action.ActionItem == "Reject") {
      this._UserService.PostCalls("anchors/reject", { ID: data.data.ID })
        .then(val => {
          this._sharedService.SetActionStatus(true);
        })

    }

    //console.log(data);
  }

  exportCSV() {
    this._UserService.PostCalls("anchors/export", {ID:-1 ,fileType:"text/comma-separated-values"})
      .then((res: any) => {

        if(res.data && res.data.length){
          let typedArray = new Uint8Array(res);
          const stringChar = typedArray.reduce((data, byte)=> {
            return data + String.fromCharCode(byte);
            }, '')
          let base64String = btoa(stringChar);
          let doc = this._domSanitizer.bypassSecurityTrustUrl(`data:application/octet-stream;base64, ${base64String}`) as string;
          doc = this._domSanitizer.sanitize(SecurityContext.URL, doc) ;
          const downloadLink = document.createElement("a");
          const fileName = "List.csv";
          downloadLink.href = doc;
          downloadLink.download = fileName;
          downloadLink.click();
        }
      })
      .catch(err=>{
        //console.log(err);
      })


  }
}
