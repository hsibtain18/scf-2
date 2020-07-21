import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'form-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit {

  @Output() onSubmit = new EventEmitter();
  @Input() fields: any[] = [];
  @Input()form: FormGroup;
  constructor() { }

  ngOnInit(): void {
    // let fieldsCtrls = {};
    // for (let f of this.fields) {
    //   if (f.type != 'checkbox') {
    //     fieldsCtrls[f.name] = new FormControl({ value: f.value ? f.value : "", disabled: this.checkEval(f) }, [Validators.required])
    //   } else {
    //     let opts = {};
    //     for (let opt of f.options) {
    //       opts[opt.key] = new FormControl(opt.value);
    //     }
    //     fieldsCtrls[f.name] = new FormGroup(opts)
    //   }
    // }
    // this.form = new FormGroup(fieldsCtrls);
  }

  checkEval(val) {
    let Status = val.Status
    return eval(val.readonly);
  }
  trackByFn(index: any, item: any) {
    return index;
 }
}