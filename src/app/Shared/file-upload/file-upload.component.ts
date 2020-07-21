import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ControlContainer, FormGroupDirective } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]

})
export class FileUploadComponent implements OnInit {

  @Output() FileUpload = new EventEmitter();
  @Input() file: any;
  parentForm: FormGroup;
  @Input() heading: any;
  @Input() check: boolean;
  @Input() fileObject: any
  @Output() FileUploadEvent = new EventEmitter()

  FileView: boolean = false;
  name: string = ""
  hideTable = true;
  FileObject: any[] = []
  constructor(private mainForm: FormGroupDirective) {

  }

  ngOnInit(): void {
    this.parentForm = this.mainForm.form;
    // this.parentForm = 
    this.FileView = this.fileObject.length != 0 ? true : false;
    this.parentForm.addControl("FileName", new FormControl("", Validators.required))
    this.parentForm.addControl("FileData", new FormControl("", Validators.required))
  }
  // public fileEvent(event) {
  //   const reader = new FileReader();
  //   this.form.controls.FileName.setValue(event.target.files[0].name.split('.')[0]);
  // }
  onFileChange(event) {
    // this.parentForm.addControl("FileName", new FormControl("", Validators.required))
    // this.parentForm.addControl("FileData", new FormControl("", Validators.required))
    this.parentForm.controls.FileName.setValue(event.target.files[0].name.split('.')[0]);
    let val: any[] = event.target.files[0];
    this.parentForm.patchValue({
      FileData: this.fileEvent(event)
    })
    this.fileObject.push({
      FileDisplayName: this.parentForm.get('FileName').value,
      UploadDate: formatDate(new Date(), 'yyyy/MM/dd', 'en'),
      Type: 'Inital Offer'
    })
    
  }


  public fileEvent(event): any {

    var fileObjDetail: any = {};


    let file = event.target.files[0];


    let start = 0;
    let stop = file.size - 1;

    let reader: FileReader = new FileReader();
    let blob = file.slice(start, stop + 1);


    reader.readAsDataURL(blob);
    // //reader.readAsDataURL(file);
    let byteArray: any = new Array();

    // let self = this;
    reader.onloadend = function (evt: any) {





      let str: any = reader.result;

      let bytesString = "";

      let spl = str.substring(str.indexOf(",") + 1, str.length);
      bytesString = window.atob(spl);
      for (let i = 0; i < bytesString.length; i++) {
        byteArray.push(bytesString.charCodeAt(i));
      }

    }


    fileObjDetail.FileData = byteArray;



    let extension = file.name.split(".");

    if (extension.length > 0)
      fileObjDetail.FileExtension = extension[1];

    fileObjDetail.FileType = file.type;

    return fileObjDetail;
  }
  DeleteFile() {
    this.fileObject = []
    this.FileView = false;
  }
}