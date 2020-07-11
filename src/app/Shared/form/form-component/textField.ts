import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text,email,tel,textarea,password, 
@Component({
    selector: 'textField',
    template: `

      <div  [formGroup]="form" class="form-group col-md-12 p-0 input-group">
    <span class="col-md-12 p-0 has-float-label">
        <input class="form-control"   [id]="field.name" [readOnly]="field.readonly"  type="text" [name]="field.name" 
        [formControlName]="field.name" placeholder="Name" />
        <label for="Anchor"> {{field.label}} </label>
    </span>

</div>
    `
})
export class TextFieldComponent {
    @Input() field: any = {};
    @Input() form: FormGroup;
    get isValid() { return this.form.controls[this.field.name].valid; }
    get isDirty() { return this.form.controls[this.field.name].dirty; }

    constructor() {

    }
}