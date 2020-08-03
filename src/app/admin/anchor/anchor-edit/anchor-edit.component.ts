import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { InfoPanelComponent } from 'src/app/Shared/info-panel/info-panel.component';

@Component({
  selector: 'app-anchor-edit',
  templateUrl: './anchor-edit.component.html',
  styleUrls: ['./anchor-edit.component.scss'],

})
export class AnchorEditComponent implements OnInit {



  public UiObject: any = []
  active = 3;
  public form = new FormGroup({});
  unsubcribe: any

  public Status: any;
  AnchorObject: any = []
  AnchorID: number;
  sendObject: any = {};
  constructor(private route: ActivatedRoute,
    private _dataService: UserDataService,
    private _router: Router) {
    this.route.params.subscribe(params => {
      this.AnchorID = +params['id'];
      if (this.AnchorID) {
        this._dataService.GetCalls("anchors", this.AnchorID)
          .then((data: any) => {
            this.AnchorObject = data;
            this.Status = data.Data.Status
            this.form.addControl("ID", new FormControl(data.Data.ID));
          })
      }
      else {
        this.Status = -1
        this.AnchorObject.push({ ID: 0 });
        this.form.addControl("ID", new FormControl(0));

      }
    });


  }

  ngOnInit(): void {
    this.UiObject = this.route.snapshot.data.UIdata[0]

    // this.UiObject = await this.getUiData();
    // await this.CreateForm()

  }

  CreateForm() {
    return new Promise((resolve, reject) => {
      this.UiObject.Controls[0].Controls.forEach(element => {
        element.Controls.forEach(ele => {
          this.form.addControl(ele.Type + ele.ID, new FormGroup({}))
        });
      });
      console.log(this.form)

    })

  }
  getInnerControls(obj: any) {
    let field: any[] = [];
    // this.form.addControl(obj.Type+obj.ID,this.builder.group([]))
    let tempArray = this.form.get(obj.Type + obj.ID) as FormArray;
    let fg = new FormGroup({});
    obj.Controls.forEach(element => {
      let f: any = {}
      f.type = element.Type;
      f.name = element.Options.name;
      f.label = element.Options.label;
      f.inputType = element.Options.texttype != null ? element.Options.texttype : 'text'
      f.readonly = element.Options.readonly;
      if (this.Status >= 0 && this.AnchorObject.Data[element.Options.name] != null) {
        f.value = this.AnchorObject.Data[element.Options.name]
      }
      if (element.Type != 'Button') {
      }
      if (element.Type == 'DateRangePicker' || element.Type == 'Button') {
        f.options = element.Options;
      }
      field.push(f);

    });

    return field;
  }

  getChildComponent(TypeID) {
    if (TypeID == 8) {
      return InfoPanelComponent;
    }

  }
  SaveData(action) {
    // this.Mapper(Event);


    if (action == "Reject") {
      this._dataService.PutCalls("anchors/reject", { ID: this.form.get('ID').value })
        .then(val => {
          this._router.navigate(['/User/Anchor']);
        })
    }
    if (action == "Create") {
      this._dataService.PostCalls("anchors/save", this.form.value)
        .then((val: any) => {
          if (val.Found) {

          }
          else {
            this._router.navigate(['/User/Anchor']);

          }
          // this.Status=val.Status;
          console.log(val);
        })
    }
    if (action == "Cancel") {
      this._router.navigate(['/User/Anchor']);

    }
    else {
      this.form.addControl("AnchorCode", new FormControl(this.AnchorObject.Data.AnchorCode));

      this._dataService.PostCalls("offer/create", this.form.value)
        .then((val: any) => {
          this._router.navigate(['/User/Anchor']);
          // this.Status=val.Status;
          console.log(val);
        })
    }


    console.log(this.form.value);


  }
  getForm(val) {
    return this.form.get(val);
  }
  change(val) {
    console.log(val)
  }
  FileUploadAPI(Action) {
    console.log(this.form)
    if (Action.ActionValue == "cancel") {
      this._router.navigate(['/User/Anchor'])
    } else {
      this.form.addControl("AnchorCode", new FormControl(this.AnchorObject.Data.AnchorCode));
      console.log(this.form.controls['signed'].value)
      if (this.form.controls['signed'].value == true) {
        this._dataService.PostCalls("offer/signedoffer", this.form.value)
          .then(val => {
            this._router.navigate(['/User/Anchor'])
          })
      } else {
        this._dataService.PostCalls("offer/agreement", this.form.value)
          .then(val => {
            this._router.navigate(['/User/Anchor'])
          })
      }

    }
  }
  Mapper(obj: any) {
    Object.keys(obj).forEach((key, idx) => {
      this.sendObject[key] = obj[key];
    });
  }


  CheckCondition(val) {
    return eval(val);
  }
  getFileObject(inner) {
    let obj = inner.Controls.filter(ele => {
      if (ele.Type == "Collection") {
        return ele.Options.name;
      }
    })
    return this.AnchorObject[obj[0].Options.name];
  }
  FileEvent(event) {
    if (event == 'view') {

    }

  }
}