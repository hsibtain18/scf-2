import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

// text,email,tel,textarea,password, 
@Component({
    selector: 'DateField',
    template: `

      <div  [formGroup]="form" class="form-group col-md-12 p-0 input-group">
    <span class="col-md-12 p-0 has-float-label">

        <input class="form-control" placeholder="yyyy-mm-dd" [formControlName]="field.name"
             name="dp"   ngbDatepicker (click)="d.toggle()"#d="ngbDatepicker">
        <label [for]="field.name"> {{field.label}} </label> 
    </span>
   
</div>
    `
})
export class DateFieldComponent implements OnInit {
    @Input() field: any = {};
    @Input() form: FormGroup;
    get isValid() { return this.form.controls[this.field.name].valid; }
    get isDirty() { return this.form.controls[this.field.name].dirty; }

    constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
      
      }
    ngOnInit(): void {
        let Status = this.field.Status
        // if(eval(this.field.readonly)){
        //     this.form.controls[this.field.name].reset({ value: this.field.value, disabled: true });
        // }
        // console.log(this.field)

    }
    checkEval(val) {
        let Status = val.Status
        // console.log(this.form)
        // return eval(val.readonly);
        

    }
  }
