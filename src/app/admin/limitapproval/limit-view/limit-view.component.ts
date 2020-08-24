import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { CanComponentDeactivate } from 'src/app/Guards/DeActicateGuard';
import { DialogService } from 'src/app/Shared/services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { loadingConfig } from 'src/app/const/config';

@Component({
  selector: 'app-limit-view',
  templateUrl: './limit-view.component.html',
  styleUrls: ['./limit-view.component.scss']
})
export class LimitViewComponent implements OnInit, CanComponentDeactivate {

  public form = new FormGroup({});

  public UiObject: any = []
  public Status: any;
  active;
  limitID: number
  LimitObject: any = []
  InvoicesList: any = [];
  public showSpinner: boolean = false;
  public spinnerConfig: any;
  constructor(private route: ActivatedRoute, private _dataService: UserDataService,
    private _router: Router, private _modalCustomService: DialogService,
    private _toastService: ToastrService
  ) {
    this.route.params.subscribe(params => {
      this.limitID = +params['id'];
      Promise.all([
        this._dataService.GetCalls("buyer/invoices", this.limitID),
        this._dataService.GetCalls("buyer", this.limitID)
      ]).then((val: any) => {
        this.InvoicesList = val[0];
        this.LimitObject = val[1];
        this.Status = val[1].Data.Status
        this.form.addControl("ID", new FormControl(val[1].Data.ID));


      })
      // this._dataService.GetCalls("buyer", this.limitID)
      //   .then((data: any) => {
      //     this.LimitObject = data;
      //     // this.Status = data.Data.Status
      //     this._dataService.GetCalls("buyer/invoices",this.limitID)
      //     .then(val=>{
      //       this.InvoicesList = val;
      //     })

      //     this.form.addControl("ID", new FormControl(data.Data.ID));
      //   })
    });
  }
  canDeactivate() {
    if (this.form.dirty) {
      return false;

    } else {
      return true;
    }
  }
  ngOnInit(): void {
    this.UiObject = this.route.snapshot.data.UIdata[0]
    this.spinnerConfig = loadingConfig;
  }
  CheckCondition(val) {
    return eval(val);
  }
  getInnerControls(obj) {
    let field: any[] = [];
    // this.form.addControl(obj.Type+obj.ID,this.builder.group([]))
    // let tempArray = this.form.get(obj.Type + obj.ID) as FormArray;
    let fg = new FormGroup({});
    obj.Controls.forEach(element => {
      let f: any = {}
      f.type = element.Type;
      f.name = element.Options.name;
      f.validators = element.Options.validators;
      f.label = element.Options.label;
      f.inputType = element.Options.texttype != null ? element.Options.texttype : 'text'
      f.readonly = element.Options.readonly;
      if (this.LimitObject.Data[element.Options.name] != null) {
        f.value = this.LimitObject.Data[element.Options.name]
      }

      if (element.Type != 'Button') {
        // tempArray.insert(element.Options.name, new FormControl({ value: f.value ? f.value : '', disabled: eval(f.readonly) }, Validators.required));
        // this.form.addControl(element.Options.name, new FormControl({ value: f.value ? f.value : '', disabled: eval(f.readonly) }, Validators.required));
      }
      if (element.Type == 'DateRangePicker' || element.Type == 'Button') {
        f.options = element.Options;
      }
      field.push(f);

    });

    return field;
  }
  SaveData(action) {
    this.showSpinner = true;
    if (action == "Reject") {
      this._dataService.PostCalls("limit/reject", { ID: this.form.get('ID').value })
        .then(val => {
          this._toastService.success("Rejected Successfully")
          this.showSpinner = false;
          this.navigate();
        })
    }
    if (action == "Approve") {
      this._dataService.PostCalls("limit/approve", this.form.value)
        .then((val: any) => {
          this.showSpinner = false;
          if (val.Status == 201) {
            this._modalCustomService.OpenTimedDialog({ heading: val.Messages, type: 4 });
          }
          else {
            // this._modalCustomService.OpenTimedDialog({heading:"Created Successfully",type:1})
            this._toastService.success("Approved Successfully")
            this.navigate();

          }
          // this.Status=val.Status;
          //console.log(val);
        })
    }
  }
  FileUploadAPI(Action) {
    this.showSpinner = true;

    if (Action.ActionValue == "cancel") {
      this.navigate();

    }
    if (Action.ActionValue == "save") {
      this.showSpinner = true;
      this._dataService.PostCalls("limit/agreement", this.form.value)
        .then(val => {
          this.showSpinner = false;
          this._toastService.success("Saved Successfully")

          this.navigate();

        }).catch(err => {
          this.showSpinner = false;

        })


    }
  }
  navigate() {
    this._router.navigate(['/User/LimitApproval'], { state: { ParentID: -1, MenuID: -1, URL: "/User/LimitApproval" } })

  }
  getFileObject(inner) {
    let obj = inner.Controls.filter(ele => {
      if (ele.Type == "Collection") {
        return ele.Options.name;
      }
    })
    return this.LimitObject[obj[0].Options.name];
  }
  FileEvent(value) {
    //console.log(value)
  }
}
