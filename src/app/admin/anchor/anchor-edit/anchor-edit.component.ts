import { Component, OnInit, ViewChild, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  public form: FormGroup;
  unsubcribe: any

  public Status: any;
  AnchorObject: any = []
  AnchorID: number;
  sendObject: any ={};
  constructor(private route: ActivatedRoute,
    private _dataService: UserDataService,
    private builder: FormBuilder) {
    this.route.params.subscribe(params => {
      this.AnchorID = +params['id'];
      this._dataService.GetCalls("anchors", this.AnchorID)
        .then((data: any) => {
          this.AnchorObject = data;
          this.Status = data.Data.Status
        })
    });

    this.form = new FormGroup({});

  }

  async ngOnInit(): Promise<any> {
    this.UiObject = this.route.snapshot.data.UIdata[0]
    // this.UiObject = await this.getUiData();
    // await this.CreateForm()
    console.log(this.form)

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
      if (this.AnchorObject.Data[element.Options.name] != null) {
        f.value = this.AnchorObject.Data[element.Options.name]
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

  getChildComponent(TypeID) {
    if (TypeID == 8) {
      return InfoPanelComponent;
    }

  }
  SaveData(Event: any) {
    this.Mapper(Event);
    // this.form.addControl("offer",Event)
    console.log(this.form);
    this.sendObject.AnchorCode=this.AnchorObject.Data.AnchorCode
    this._dataService.PostCalls("offer/create", this.sendObject)
      .then(val => {
        console.log(val);
      })

  }
  getForm(val) {
    return this.form.get(val);
  }
  change(val) {
    console.log(val)
  }
  FileUploadAPI(FormValue : any) {
    this.sendObject["FileData"]={
      FileData:FormValue.FileData.FileData,
      FileDisplayName:FormValue.FileName,
      FileExtension:FormValue.FileData.FileExtension,
      FileType:FormValue.FileData.FileType
    };

  
    // this.form.addControl("Offer Upload", FormValue);
    console.log(this.form);
  }
   Mapper(obj: any){
    Object.keys(obj).forEach((key, idx)=> {
      this.sendObject[key]=obj[key];
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