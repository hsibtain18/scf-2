import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-info-panel',
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.scss']
})
export class InfoPanelComponent implements OnInit {

  @Output() onSubmit = new EventEmitter();
  @Input() fields: any[] = [];
  @Input() heading: string = "";
  @Input() Status: number;
  buttons: any[] = []
  parentForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.buttons = this.fields.filter((element => {
      if (element.type == 'Button')
        return element;
    }))

    let fieldsCtrls = {};
    for (let f of this.fields) {
      if (f.type != 'checkbox' && f.type != 'Button') {
        if (f.type == 'DateRangePicker') {
          console.log(f);
        }
        else {
          fieldsCtrls[f.name] = new FormControl({ value: f.value ? f.value : "", disabled: this.checkEval(f) }, [Validators.required])
        }
      }

    }
    this.parentForm = new FormGroup(fieldsCtrls);
    // console.log(this.parentForm.controls)
  }


  checkEval(val) {
    let Status = val.Status
    return eval(val.readonly);
  }
  saveValue() {
    // console.log(this.form.value)
    this.onSubmit.emit(this.parentForm.value)
  }
  moveBack
}
