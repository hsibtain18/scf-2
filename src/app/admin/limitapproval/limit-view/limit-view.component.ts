import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-limit-view',
  templateUrl: './limit-view.component.html',
  styleUrls: ['./limit-view.component.scss']
})
export class LimitViewComponent implements OnInit {

  public form = new FormGroup({});

  public UiObject: any = []
  public Status: any;
  active;
  limitID: number
  LimitObject: any = []
  constructor(private route: ActivatedRoute, private _dataService: UserDataService,
    private _router: Router
  ) {
    this.route.params.subscribe(params => {
      this.limitID = +params['id'];
      this._dataService.GetCalls("buyer", this.limitID)
        .then((data: any) => {
          this.LimitObject = data;
          // this.Status = data.Data.Status
          this._dataService.GetCalls("buyer/invoices",this.limitID)
          .then(val=>{
            console.log(val);
          })
 
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
    if (action == "Reject") {
      this._dataService.PostCalls("limit/reject", { ID: this.form.get('ID').value })
        .then(val => {
          this.navigate();
        })
    }
    if (action == "Approve") {
      this._dataService.PostCalls("limit/approve", this.form.value)
        .then((val: any) => {
          if (val.Found) {

          }
          else {
            this.navigate();

          }
          // this.Status=val.Status;
          console.log(val);
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
    console.log(value)
  }
}
