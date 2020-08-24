import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/Shared/services/dialog.service';
import { CanComponentDeactivate } from 'src/app/Guards/DeActicateGuard';

@Component({
  selector: 'app-contract-view',
  templateUrl: './contract-view.component.html',
  styleUrls: ['./contract-view.component.scss']
})
export class ContractViewComponent implements OnInit, CanComponentDeactivate {

  public form = new FormGroup({});

  public UiObject: any = []
  public Status: any;
  active;
  contractID: number
  Contract: any = []
  BreadCrumbs = ""
  constructor(private route: ActivatedRoute, private _dataService: UserDataService,
    private _router: Router, private _toast: ToastrService, private _dialog: DialogService
  ) {
    this.route.params.subscribe(params => {
      this.contractID = +params['id'];
      if (this.contractID) {
        this._dataService.GetCalls("contractpayment", this.contractID)
          .then((data: any) => {
            this.Contract = data;
            this.Status = data.Data.Status
            this.BreadCrumbs = "View";
            this.form.addControl("ID", new FormControl(data.Data.ID));
          })
      }
      // else {
      //   this.BreadCrumbs = "Create"
      //   this.Status = -2

      // }

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
    this.UiObject = this.route.snapshot.data.UIdata[0];
    this.UiObject.Controls[0].Controls.forEach(element => {
      if(this.CheckCondition(element.Options.visible) && !this.active){
        this.active=element.ID;
      }
    });
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
      if (this.Status > -2 && this.Contract.Data[element.Options.name] != null) {
        f.value = this.Contract.Data[element.Options.name]
      }
      if (element.Type != 'Button') {
        // tempArray.insert(element.Options.name, new FormControl({ value: f.value ? f.value : '', disabled: eval(f.readonly) }, Validators.required));
        // this.form.addControl(element.Options.name, new FormControl({ value: f.value ? f.value : '', disabled: eval(f.readonly) }, Validators.required));
      }
      // if (element.Type == 'DateRangePicker' || element.Type == 'Button') {
      //   f.options = element.Options;
      // }
      f.options = element.Options;

      field.push(f);

    });

    return field;
  }
  SetActive(Tab) {
    let condition = eval(Tab.Options.visible)
    if (!this.active && condition) {
      this.active = Tab.ID
    }
    return condition
  }
  SaveData(action) {
    this.form.addControl("OrderNumber", new FormControl(this.Contract.Data.OrderNumber))
    this.form.addControl("BuyerCode", new FormControl(this.Contract.Data.BuyerCode))
    if (action == "Deliver") {
      this._dataService.PostCalls("contractpayment/delivered", this.form.value)
        .then((val: any) => {
          if (val.Status == 201) {
            this._dialog.OpenTimedDialog({ heading: val.Message, type: 2 })

          } else {
            this._toast.success("Delivered Successfully")
            this.navigate();
          }

        })
    }
    if (action == "Approve") {
      this._dataService.PostCalls("contractpayment/approved", this.form.value)
        .then((val: any) => {

          if (val.Status == 201) {
            this._dialog.OpenTimedDialog({ heading: val.Message, type: 2 })

          } else {
            this._toast.success("Approved Successfully")
            this.navigate();
          }

          //console.log(val);
          this.navigate();

        })
    }
    if (action == "Reject") {
      this._dataService.PostCalls("contractpayment/rejected", this.form.value)
        .then((val: any) => {
          if (val.Status == 201) {
            this._dialog.OpenTimedDialog({ heading: val.Message, type: 2 })

          } else {
            this._toast.success("Rejected Successfully")
            this.navigate();
          }
          //console.log(val);
          this.navigate();

        })
    }
    if (action == "Update") {
      this._dataService.PostCalls("contractpayment/update", this.form.value)
        .then((val: any) => {

          if (val.Status == 201) {
            this._dialog.OpenTimedDialog({ heading: val.Message, type: 2 })

          } else {
            this._toast.success("Updated Successfully")
            this.navigate();
          }

        })
    }
    if (action == "receive") {
      this.form.controls['OrderNumber'].enable();
      this._dataService.PostCalls("contractpayment/received", this.form.value)
        .then((val: any) => {

          if (val.Status == 201) {
            this._dialog.OpenTimedDialog({ heading: val.Message, type: 2 })

          } else {
            this._toast.success("Created Successfully")
            this.navigate();
          }
          this.form.controls['OrderNumber'].disable();

        })
    }
  }
  FileUploadAPI(Action) {
    //console.log(this.form)
    if (Action.ActionValue == "cancel") {
      this.navigate();

    }
    if (Action.ActionValue == "save") {
      this._dataService.PostCalls("limit/agreement", this.form.value)
        .then(val => {
          this.navigate();

        })


    }
  }
  navigate() {
    this._router.navigate(['/User/Contract'], { state: { ParentID: -1, MenuID: -1, URL: "/User/Contract" } })

  }
  getFileObject(inner) {
    let obj = inner.Controls.filter(ele => {
      if (ele.Type == "Collection") {
        return ele.Options.name;
      }
    })
    return this.Contract[obj[0].Options.name];
  }
  getHeaderObject(inner) {
    return inner.Controls.filter(ele => {
      if (ele.Type == "GridView") {
        return ele;
      }
    })[0];

  }
  getButtons(inner) {
    let obj = inner.Controls.filter(ele => {
      if (ele.Type == "Button") {
        return ele;
      }
    })
    return obj;
  }
}
