import { Component, OnInit, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-inner-grid',
  templateUrl: './inner-grid.component.html',
  styleUrls: ['./inner-grid.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class InnerGridComponent implements OnInit {

  @Input() heading: string
  @Input() FileObject: [];
  @Input() panelDetailsHeaders: any = []
  @Input() Status: any;
  @Input() TotalAmount;
  @Input() buttonsVisible: boolean;
  @Input() ButtonsArray: any[];
  @Input() isEditable: boolean;
  headers: any;
  indexInput: number
  childForm;
  constructor(public mainForm: FormGroupDirective) { }
  ngOnInit(): void {
    this.childForm = this.mainForm.form
    console.log(this.ButtonsArray);
    console.log(this.isEditable);
    this.buttonsVisible = this.buttonsVisible == undefined ? true : false;
    this.headers = this.panelDetailsHeaders.Headers
    if (this.isEditable) {
      for (const [index, product] of this.FileObject.entries()) {
        if (!product["UpdateCheck"]) {
          this.indexInput = index
          break
        }
      }
    }

    this.headers.forEach(element => {
      if (element.Editable == 1) {
        this.childForm.addControl(element.Column, new FormControl("", Validators.required));
      }
    });
  }

}
