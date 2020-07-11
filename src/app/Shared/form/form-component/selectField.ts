import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text,email,tel,textarea,password, 
@Component({
    selector: 'dropdown',
    template: `
   <div   [formGroup]="form" class="form-group   col-md-12 p-0 input-group">
                                        <span class="col-md-12 p-0 has-float-label">
                                            <!-- <input class="form-control" class="form-control" id="Industry" type="text"
                                            placeholder="Industry" /> -->
                                            <select [name]="field.name" [disabled] ="field.readonly"  [id]="field.name"  [formControlName]="field.name"
                                                class="form-control">
                                                <option value="0" selected>Morabaha Advance</option>

                                            </select>
                                            <label [for]="field.name">Product Type</label>
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
       console.log(this.form)
    }

}