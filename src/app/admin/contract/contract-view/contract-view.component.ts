import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from 'src/app/Shared/services/dialog.service';

@Component({
  selector: 'app-contract-view',
  templateUrl: './contract-view.component.html',
  styleUrls: ['./contract-view.component.scss']
})
export class ContractViewComponent implements OnInit {

  public form = new FormGroup({});

  public UiObject: any = []
  public Status: any;
  active;
  limitID: number
  Financing: any = []
  constructor(private route: ActivatedRoute, private _dataService: UserDataService,
    private _router: Router, private _toast: ToastrService, private _dialog: DialogService
  ) {
    this.route.params.subscribe(params => {
      this.limitID = +params['id'];
      this._dataService.GetCalls("contractpayment", this.limitID)
        .then((data: any) => {
          this.Financing = data;
          this.Status = data.Data.Status
          this.form.addControl("ID", new FormControl(data.Data.ID));
        })
    });
  }
  ngOnInit(): void {
    this.UiObject = this.route.snapshot.data.UIdata[0]
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
      f.label = element.Options.label;
      f.inputType = element.Options.texttype != null ? element.Options.texttype : 'text'
      f.readonly = element.Options.readonly;
      if (this.Financing.Data[element.Options.name] != null) {
        f.value = this.Financing.Data[element.Options.name]
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
    if (action == "Delivered") {
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

          console.log(val);
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

          console.log(val);
          this.navigate();

        })
    }
    if (action == "Update") {
      this._dataService.PostCalls("financial/update", this.form.value)
        .then(val => {
          this._toast.success("Updated Successfully")

          this.navigate();
        })
    }
  }
  FileUploadAPI(Action) {
    console.log(this.form)
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
    return this.Financing[obj[0].Options.name];
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
