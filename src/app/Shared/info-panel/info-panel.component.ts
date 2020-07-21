import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss'],
  viewProviders:[{provide:ControlContainer,useExisting:FormGroupDirective}]

})
export class InfoPanelComponent implements OnInit {

  @Output() onSubmit = new EventEmitter();
  @Input() fields: any[] = [];
  @Input() heading: string = "";
  @Input() Status: number;
  buttons: any[] = []
  parentForm: FormGroup;
  constructor(private mainForm:FormGroupDirective) { }

  ngOnInit(): void {
    this.buttons = this.fields.filter((element => {
      if (element.type == 'Button')
        return element;
    }))
    console.log(this.buttons);
    let fieldsCtrls = {};
    for (let f of this.fields) {
      if (f.type != 'checkbox' && f.type != 'Button') {
        if (f.type == 'DateRangePicker') {
          // console.log(f);
          fieldsCtrls[f.name] = new FormControl({ value: f.value ? f.value : "", disabled: this.checkEval(f) })

        }
        else {
          fieldsCtrls[f.name] = new FormControl({ value: f.value ? f.value : "", disabled: this.checkEval(f) }, [Validators.required])
        }
      }

    }
    this.parentForm = new FormGroup(fieldsCtrls);
  }


  checkEval(val) {
    let Status = val.Status
    return eval(val.readonly);
  }
  buttonsCondition(val){
    return eval(val)
  }
  saveValue() {
    // console.log(this.form.value)
    this.onSubmit.emit(this.parentForm.value)
  }
  
}
