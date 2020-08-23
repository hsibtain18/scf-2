import { Component, OnInit, Input } from '@angular/core';
import { FormGroupDirective, FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { FormCreateService } from '../services/form-create.service';
import { Header } from 'primeng/api';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss']
})
export class EditTableComponent implements OnInit {

  @Input() heading = "";
  @Input() panelDetailsHeaders: any = []
  formObject: any;
  DataObject: any = []
  childForm: FormGroup
  index = 1;
  constructor(public mainForm: FormGroupDirective,
    private FormCreate: FormCreateService) { }

  ngOnInit(): void {
    this.childForm = this.mainForm.form;
    this.formObject = this.panelDetailsHeaders.Options.fileobject
    this.panelDetailsHeaders = this.panelDetailsHeaders.Headers
    this.childForm.addControl(this.formObject, new FormArray([this.CreateEntry()]));
    console.log(this.panelDetailsHeaders);

    console.log(this.childForm.value);
  }
  CreateEntry() {
    let entry = new FormGroup({});
    for (let et of this.panelDetailsHeaders) {
      if (et.Editable) {
        entry.addControl(et.Column, new FormControl('', Validators.required))
      }
    }
    this.DataObject.push(entry.value)
    return entry;
  }
  get formArr() {
    return this.childForm.get(this.formObject) as FormArray;
  }



  addNewRow() {
    this.formArr.push(this.CreateEntry());
    this.childForm
  }
}
