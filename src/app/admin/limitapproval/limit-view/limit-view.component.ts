import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
  LimitObject : any = []
  constructor(private route: ActivatedRoute,) { 
    
  }

  ngOnInit(): void {
    this.UiObject = this.route.snapshot.data.UIdata[0]
  }
  CheckCondition(val) {
    return eval(val);
  }
  getInnerControls(obj){
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
      // if (this.LimitObject.Data[element.Options.name] != null) {
      //   f.value = this.LimitObject.Data[element.Options.name]
      // }
        f.value = "hassan"

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
  SaveData(value){

  }
  FileUploadAPI(value){

  }
  getFileObject(value){

  }
  FileEvent(value){

  }
}
