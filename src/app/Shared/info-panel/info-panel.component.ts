import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlContainer, FormGroupDirective } from '@angular/forms';
import { FormCreateService } from '../services/form-create.service';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]

})
export class InfoPanelComponent implements OnInit {

  @Output() onSubmit = new EventEmitter();
  @Input() fields: any[] = [];
  @Input() heading: string = "";
  @Input() Status: number;
  @Input() formname: any;
  @Input() DataObject: any
  buttons: any[] = []
  textAreaList: any[] = []
  childForm;
  constructor(public mainForm: FormGroupDirective,
    private FormCreate: FormCreateService) { }

  ngOnInit(): void {
    this.childForm = this.mainForm.form
    this.buttons = this.fields.filter((element => {
      if (element.type == 'Button')
        return element;
    }))
    this.textAreaList = this.fields.filter((element => {
      if (element.type == 'Textarea')
        return element;
    }))
    let fieldsCtrls = {};
    for (let f of this.fields) {
      if (f.type != 'checkbox' && f.type != 'Button') {
        // if (f.type == 'DateRangePicker') {
        //   this.childForm.addControl(f.name, new FormControl({ value: f.value ? f.value : "", disabled: this.checkEval(f) }, Validators.required));
        // }
        // else {
        console.log()
        this.childForm.addControl(f.name, new FormControl({ value: f.value ? f.value : "", disabled: this.checkEval(f) }, this.SetValidators(f.validators)));
        // }
      }

    }


  }

  SetValidators(rules: any) {
    let validators: any = []
    if (rules != null) {
      let valRules = rules.split(',')
      for (let rules of valRules) {
        if (rules.indexOf("required") >= 0) {
          validators.push(Validators.required)
        }
        if (rules.indexOf("pattern()") >= 0) {
          let pattern = rules.split('|')
          validators.push(Validators.pattern(pattern[1]))
        }
        if (rules.indexOf("min()") >= 0) {
          let pattern: any = rules.split('|')
          const str: String = pattern[1]
          if (pattern[1].match("^[0-9]*$")) {
          }
          validators.push(Validators.min(pattern[1]))
        }
        if (rules.indexOf("max()") >= 0) {
          let pattern = rules.split('|')
          if (!pattern[1].match("^[0-9]*$")) {
            let val = pattern[1].split('-')  // for multi check 
            console.log(val.length);
            if (val.length == 2) {
              console.log(val[0],this.DataObject[val[0]],val[1], this.DataObject[val[1]]);

              if (this.DataObject[val[0]] > this.DataObject[val[1]]) {
                validators.push(Validators.max(this.DataObject[val[1]]))
              }
              else {
                validators.push(Validators.max(this.DataObject[val[0]]))

              }
            }
            else {
              validators.push(Validators.max(this.DataObject[pattern[1]]))
            }
          }
          else {
            validators.push(Validators.max(pattern[1]))
          }
        }
        if (rules.indexOf("maxLength()") >= 0) {
          let pattern = rules.split('|')
          validators.push(Validators.maxLength(pattern[1]))
        }
        if (rules.indexOf("minLength()") >= 0) {
          let pattern = rules.split('|')
          validators.push(Validators.minLength(pattern[1]))
        }
      }
    }
    return validators
  }
  dateRangeCreated(temp, field) {
    this.childForm.addControl(field.options.endDate, new FormControl(new Date(temp[1])));
    this.childForm.addControl(field.options.startDate, new FormControl(new Date(temp[0])));


  }
  getForm() {
    return this.childForm.get(this.formname) as FormGroup;
  }
  checkEval(val) {
    let Status = val.Status
    return eval(val.readonly);
  }
  buttonsCondition(val) {
    return eval(val)
  }
  saveValue(val) {
    // console.log(val)
    this.onSubmit.emit(val.name)
  }
  trackByFn(index: any, item: any) {
    return index;
  }

}
