import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlContainer, FormGroupDirective } from '@angular/forms';

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
  @Input() formname: any
  buttons: any[] = []
  childForm;
  constructor(public mainForm: FormGroupDirective) { }

  ngOnInit(): void {
    this.childForm = this.mainForm.form
    this.buttons = this.fields.filter((element => {
      if (element.type == 'Button')
        return element;
    }))
    console.log(this.Status)
    let fieldsCtrls = {};
    for (let f of this.fields) {
      if (f.type != 'checkbox' && f.type != 'Button') {
        if (f.type == 'DateRangePicker') {
          // fieldsCtrls[f.name] = new FormControl({ value: f.value ? f.value : "", disabled: this.checkEval(f) })
          this.childForm.addControl(f.name, new FormControl({ value: f.value ? f.value : "", disabled: this.checkEval(f) }, Validators.required));

        }
        else {
          this.childForm.addControl(f.name, new FormControl({ value: f.value ? f.value : "", disabled: this.checkEval(f) }, Validators.required));

        }
      }

    }


  }
  dateRangeCreated($event, field) {
    this.childForm.addControl(field.options.endDate, new FormControl($event[1].toJSON().split('T')[0], Validators.required))
    this.childForm.addControl(field.options.startDate, new FormControl($event[0].toJSON().split('T')[0], Validators.required))


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
