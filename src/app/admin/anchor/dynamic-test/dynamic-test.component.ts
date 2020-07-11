import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { InfoPanelComponent } from '../../../Shared/info-panel/info-panel.component';

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
  public file: any[] = [
    {
      type: 'text',
      name: 'AnchorName',
      label: 'Anchor Name',
      value: 'Syed Hassan Sibtain',
      required: true,
      readonly:true 
    },

    {
      type: 'text',
      name: 'industry',
      label: 'Industry',
      value: 'Haball',
      required: true,
      readonly:true
    }
  ]
  public fields: any[] = [
    {
      type: 'text',
      name: 'AnchorName',
      label: 'Anchor Name',
      value: 'Syed Hassan Sibtain',
      required: true,
      readonly:true 
    },

    {
      type: 'text',
      name: 'industry',
      label: 'Industry',
      value: 'Haball',
      required: true,
      readonly:true
    },
    {
      type: 'text',
      name: 'ntn',
      label: 'NTN No',
      value: '42201-6420563-7',
      required: true,
      readonly:true
    },
    {
      type: 'text',
      name: 'office',
      label: 'Registered Office',
      value: 'Karachi',
      required: true,
      readonly:true
    },
    {
      type: 'text',
      name: 'iban',
      label: 'IBAN',
      value: 'HBL-2522661651',
      required: true,
      readonly:true
    },

  ];
  constructor(private route: ActivatedRoute) {
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields))
    })
    this.unsubcribe = this.form.valueChanges.subscribe((update) => {
      console.log(update);
      this.fields = JSON.parse(update.fields);
    });
  }

  ngOnInit(): void {
    this.UiObject = this.route.snapshot.data.UIdata[0]
    // this.UiObject = [
    //   {
    //     ID: 2, Options:
    //       { text: "aascascasccs" }
    //   },
    //   {
    //     ID: 3, Options:
    //       { text: "acascascs" }
    //   },
    //   {
    //     ID: 4, Options:
    //       { text: "acascascascs" }
    //   }
    // ]
    console.log(this.UiObject[0]);
  }
  getInnerControls(obj: any ){
    let field : any = [];

    obj.forEach(element => {
      let f : any= {}
      f.type=element.Type;
      f.name=element.Options.name;
      f.label=element.Options.label;
      f.readonly=element.Options.readonly;
      f.value = 0;
      field.push(f);
      
    });
    return field;
  }

  getChildComponent(TypeID){
    if(TypeID==8){
      return InfoPanelComponent;
    }

  }
}
