import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  @Output() FileUpload = new EventEmitter();
  @Input() file: any;
  @Input() form: FormGroup;
  @Input() heading: any;
  @Input() check: boolean;
  FileView : boolean =false;
  name: string = ""
  hideTable = true;
  FileObject: any[] = []
  constructor() {
  }

  ngOnInit(): void {
    console.log(this.form)
    this.form.addControl("FileName", new FormControl("", Validators.required))
    this.form.addControl("FileData", new FormControl("", Validators.required))

  }
  // public fileEvent(event) {
  //   const reader = new FileReader();
  //   this.form.controls.FileName.setValue(event.target.files[0].name.split('.')[0]);
  // }
  onFileChange(event) {

    this.form.controls.FileName.setValue(event.target.files[0].name.split('.')[0]);
    let val: any[] = event.target.files[0];
    this.form.patchValue({
      FileData: this.fileEvent(event)
    })
    this.FileObject.push({
      FileName: this.form.get('FileName').value,
      Date: formatDate(new Date(), 'yyyy/MM/dd', 'en')
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





      let str = reader.result;

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
  DeleteFile(){
    this.FileObject = []
    this.FileView = false;
  }
}
