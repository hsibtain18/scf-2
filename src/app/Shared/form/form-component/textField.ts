import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// text,email,tel,textarea,password, 
@Component({
    selector: 'textField',
    template: `

      <div  [formGroup]="form" class="form-group col-md-12 p-0 input-group">
    <span class="col-md-12 p-0 has-float-label">
        <input class="form-control"   [id]="field.name"   autocomplete="off"   [type]="field.inputType" [name]="field.name"  
        [ngClass]="{'validationError':   (form.controls[field.name].errors && (form.controls[field.name].dirty || form.controls[field.name].touched))}"
        [formControlName]="field.name" placeholder="Name" />
        <label [for]="field.name"> {{field.label}} </label>
    </span>
</div>
    `
})
export class TextFieldComponent implements OnInit {
    @Input() field: any = {};
    @Input() form: FormGroup;
    get isValid() { return this.form.controls[this.field.name].valid; }
    get isDirty() { return this.form.controls[this.field.name].dirty; }

    constructor() {

    }
    ngOnInit(): void {
        let Status = this.field.Status
        // if(eval(this.field.readonly)){
        //     this.form.controls[this.field.name].reset({ value: this.field.value, disabled: true });
        // }
    }
    checkEval(val) {
        let Status = val.Status
        
    }
    
}