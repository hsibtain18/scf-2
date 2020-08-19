import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlContainer, FormGroupDirective, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-inner-grid',
  templateUrl: './inner-grid.component.html',
  styleUrls: ['./inner-grid.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class InnerGridComponent implements OnInit {

  @Input() heading: string
  @Input() FileObject: any[];
  @Input() panelDetailsHeaders: any = []
  @Input() Status: any;
  @Input() TotalAmount;
  @Input() buttonsVisible: boolean;
  @Input() ButtonsArray: any[];
  @Input() isEditable: boolean;
  @Output() ActionEmit = new EventEmitter();
  headers: any;
  indexInput: number;
  childForm;
  constructor(public mainForm: FormGroupDirective) { }
  ngOnInit(): void {
    this.childForm = this.mainForm.form
    this.buttonsVisible = this.buttonsVisible == undefined ? true : false;
    this.headers = this.panelDetailsHeaders.Headers
    if (this.isEditable) {
      for (const [index, product] of this.FileObject.entries()) {
        if (!product["UpdateCheck"]) {
          this.indexInput = index
          break
        }
      }

      if (this.indexInput < this.FileObject.length) {
        this.childForm.addControl("DetailId", new FormControl(this.FileObject[this.indexInput].ID));

        this.headers.forEach(element => {
          if (element.Editable == 1) {
            this.childForm.addControl(element.Column, new FormControl("", Validators.required));
          }
        });
      }
    }
  }
  sendValue(val) {
    this.ActionEmit.emit(val.Options.name)
  }
  buttonsCondition(val) {
    return eval(val)
  }
}
