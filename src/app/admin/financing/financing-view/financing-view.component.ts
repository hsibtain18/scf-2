import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { ToastrService } from 'ngx-toastr';
import { CanComponentDeactivate } from 'src/app/Guards/DeActicateGuard';

@Component({
  selector: 'app-financing-view',
  templateUrl: './financing-view.component.html',
  styleUrls: ['./financing-view.component.scss']
})
export class FinancingViewComponent implements OnInit, CanComponentDeactivate {

  public form = new FormGroup({});

  public UiObject: any = {}
  public Status: any;
  active;
  financeID: number
  Financing: any = [];
  BreadCrumbs = ""
  constructor(private route: ActivatedRoute, private _dataService: UserDataService,
    private _router: Router, private _toast: ToastrService
  ) {
    this.route.params.subscribe(params => {
      this.financeID = +params['id'];
      if (this.financeID) {
        this._dataService.GetCalls("financial", this.financeID)
          .then((data: any) => {
            this.Financing = data;
            this.Status = data.Data.Status
            this.form.addControl("ID", new FormControl(data.Data.ID));
            this.BreadCrumbs = "View"
          })
      }
      else {
        this.Status = -2;
        this.BreadCrumbs = "Create"
      }

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
    //console.log(typeof this.UiObject)
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
    let fg = new FormGroup({});
    obj.Controls.forEach(element => {
      let f: any = {}
      f.type = element.Type;
      f.name = element.Options.name;
      f.validators = element.Options.validators;
      f.label = element.Options.label;
      f.inputType = element.Options.texttype != null ? element.Options.texttype : 'text'
      f.readonly = element.Options.readonly;
      if (this.Status > -2 && this.Financing.Data[element.Options.name] != null) {
        f.value = this.Financing.Data[element.Options.name]
      }
      if (element.Type != 'Button') {
      }
      f.options = element.Options;

      field.push(f);

    });

    return field;
  }
  SaveData(action) {
    if (action == "Reject") {
      this._dataService.PostCalls("financial/reject", this.form.value)
        .then(val => {
          this._toast.success("Rejected Successfully")
          this.navigate();
        })
    }
    if (action == "Approve") {
      this._dataService.PostCalls("financial/approve", this.form.value)
        .then((val: any) => {

          this._toast.success("Approved Successfully")

          //console.log(val);
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
    if (action == "Create") {
      this._dataService.PostCalls("financial/createorder", this.form.value)
        .then(val => {
          this._toast.success("Created Successfully")

          this.navigate();
        })
    }
  }

  check(Tab) {
    //console.log(Tab)
  }
  SetActive(Tab) {
    let condition = eval(Tab.Options.visible)
    if (!this.active && condition) {
      this.active = Tab.ID
    }
    return condition
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
    this._router.navigate(['/User/Financing'], { state: { ParentID: -1, MenuID: -1, URL: "/User/Financing" } })

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
}
