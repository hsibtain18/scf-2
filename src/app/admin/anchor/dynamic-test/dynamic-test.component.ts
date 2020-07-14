import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InfoPanelComponent } from '../../../Shared/info-panel/info-panel.component';
import { UserDataService } from '../../user-data.service';

@Component({
  selector: 'app-dynamic-test',
  templateUrl: './dynamic-test.component.html',
  styleUrls: ['./dynamic-test.component.scss']
})
export class DynamicTestComponent implements OnInit {


  public UiObject: any = []
  active = 3;
  public form: FormGroup;
  unsubcribe: any

  public status = -6;
  AnchorObject: any = []
  constructor(private route: ActivatedRoute,
    private _dataService: UserDataService) {
    this._dataService.GetCalls("anchors", 2)
      .then(data => {
        this.AnchorObject = data;
      })
    this.form = new FormGroup({})
 
  }

  ngOnInit(): void {
    this.UiObject = this.route.snapshot.data.UIdata[0]
    // this.UiObject = await this.getUiData();
    // await this.CreateForm()

  }
 
  getInnerControls(obj: any) {
    let field: any[] = [];

    obj.forEach(element => {
      let f: any = {}
      f.type = element.Type;
      f.name = element.Options.name;
      f.label = element.Options.label;
      f.readonly = element.Options.readonly;
      if (this.AnchorObject[element.Options.name] != null) {
        f.value = this.AnchorObject[element.Options.name]
      }
      if (element.Type != 'Button') {
        this.form.addControl(element.Options.name, new FormControl(f.value ? f.value : '', Validators.required));
      }
      f.Status = -2;
      field.push(f);

    });
    return field;
  }

  getChildComponent(TypeID) {
    if (TypeID == 8) {
      return InfoPanelComponent;
    }

  }
  SaveData(Event: any[]){
    console.log(Event);
    this._dataService.PostCalls("offer/create",Event)
    .then(val=>{
      console.log(val);
    })

  }
}
