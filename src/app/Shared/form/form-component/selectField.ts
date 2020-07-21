import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text,email,tel,textarea,password, 
@Component({
    selector: 'dropdown',
    template: `
   <div   [formGroup]="form" class="form-group   col-md-12 p-0 input-group">
                                        <span class="col-md-12 p-0 has-float-label">
                                            <select [name]="field.name"   [id]="field.name"  [formControlName]="field.name"
                                                class="form-control">label
                                                <option value="0" selected disabled >  Select {{field.label}} </option>
                                                <option value="1" selected>Morabaha Advance</option>

                                            </select>
                                            <label [for]="field.name">{{field.label}}</label>

                                        </span>
                                    </div>
  
    `
})
export class SelectFieldComponent  implements OnInit {
    @Input() field: any = {};
    @Input() form: FormGroup;
    get isValid() { return this.form.controls[this.field.name].valid; }
    get isDirty() { return this.form.controls[this.field.name].dirty; }

    constructor() {

    }
    ngOnInit(): void {
    }

}