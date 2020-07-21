import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

// text,email,tel,textarea,password, 
@Component({
  selector: 'DateField',
  template: `

      <div  [formGroup]="form" class="form-group col-md-12 p-0 input-group">
    <span class="col-md-12 p-0 has-float-label">

        <!-- <input class="form-control" placeholder="yyyy-mm-dd" [formControlName]="field.name"
             name="dp"   ngbDatepicker (click)="d.toggle()"#d="ngbDatepicker"> -->
             <input type="text"
           placeholder="Daterangepicker"
           class="form-control" (bsValueChange)="dateRangeCreated($event)"
           bsDaterangepicker [formControlName]="field.name"
           [bsConfig]="{ dateInputFormat: 'DD-MM-YYYY', containerClass: 'cust-date' }">
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
  public dpConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  
  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
this.dpConfig.containerClass="cust-date";
  }
  ngOnInit(): void {
    let Status = this.field.Status
  }
  dateRangeCreated($event) {
    this.form.addControl(this.field.options.endDate, new FormControl($event[1].toJSON().split('T')[0], Validators.required))
    this.form.addControl(this.field.options.startDate, new FormControl($event[0].toJSON().split('T')[0], Validators.required))
 

  }
  checkEval(val) {
    let Status = val.Status
    // console.log(this.form)
    // return eval(val.readonly);
  }
}
