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
  @Input() status: number;
  buttons: any[] = []
  @Input() form: FormGroup;
  constructor() { }

  ngOnInit(): void {
    console.log(this.form)
    this.buttons = this.fields.filter((element => {
      if (element.type == 'Button')
        return element;
    }))

    let fieldsCtrls = {};
    for (let f of this.fields) {
      if (f.type != 'checkbox' && f.type != 'Button') {
        fieldsCtrls[f.name] = new FormControl(f.value ? f.value : "", [Validators.required])
      }

    }
    // this.form = new FormGroup(fieldsCtrls);
  }


  checkEval(val) {
    let Status = val.Status
    return false;
  }
  saveValue() {
    // console.log(this.form.value)
    this.onSubmit.emit(this.form.value)
  }
}
