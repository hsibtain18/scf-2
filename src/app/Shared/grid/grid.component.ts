import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UserDataService } from 'src/app/admin/user-data.service';
import { loadingConfig } from 'src/app/const/config';
import { Router } from '@angular/router';
import { FileService } from '../services/fileService';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as _ from 'lodash';
// import * as XLSX from 'xl '
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {
  @Input() UIObject;
  buttonsArray: any[];
  value: any[] = [];
  ApiRoute: string;
  @Output() Action = new EventEmitter<any>();
  @Output() ButtonsAction = new EventEmitter<any>();
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

  @ViewChild('hiddenFile', { static: false }) uploadFileInput: ElementRef;
  fileUploadForm: FormGroup;
  fileInputLabel: string;
  arrayBuffer: any;
  constructor(
    private _UserService: UserDataService,
    private _router: Router,
    private _fileService: FileService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fileUploadForm = this.formBuilder.group({
      myfile: ['']
    });
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
        if (!this.filterObject.PageNumber) {
          this.value = val.Data
        }
        else {
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
  onFileChange(File: any, action) {
    let obj = {};
    let file = File.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");

      obj["FileData"] = { buffer: arr };
      obj["action"]= action
      this.Action.emit(obj)
    }
  }
  exportCSV() {
    this._UserService.PostCalls("anchors/export", { ID: -1, fileType: "text/comma-separated-values" })
      .then((res: any) => {
        console.log(res)
        var hiddenElement = document.createElement('a');

        hiddenElement.href = 'data:attachment/csv,' + encodeURI(res);
        hiddenElement.target = '_blank';
        hiddenElement.download = 'orders.csv';
        hiddenElement.click();
      
      })
      .catch(err => {
        console.log(err);
      })


  }
  NavigateUrl(Options) {
    if (Options.route) {
      this._router.navigate([Options.route], { state: { ParentID: -2, MenuID: -1, URL: Options.route } });
    }
    else {
      this.ButtonsAction.emit(Options)
    }
  }
}
