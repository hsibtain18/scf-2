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
  @Input() fields: any;
  childForm: FormGroup;
  @Input() heading: any;
  @Input() options: any = {};
  @Input() fileObject: any[];
  @Input() DirectCall: any;
  @Input() Status: any;
  @Output() FileUploadEvent = new EventEmitter()
  upload = true;
  FileView: boolean = false;
  name: string = ""
  hideTable = true;
  FileObject: any[] = []
  constructor(private mainForm: FormGroupDirective) {

  }

  ngOnInit(): void {
    this.childForm = this.mainForm.form;
    console.log(this.fileObject);
    if (this.fileObject.length == 0 || this.fileObject.length < this.options.Options.maxFiles) {
      for (let f of this.fields) {
        if (f.type != "Collection") {
          // fieldsCtrls[f.name] = new FormControl({ value: f.value ? f.value : "", disabled: this.checkEval(f) })
          if (f.type == "Checkbox") {
            this.childForm.addControl(f.name, new FormControl(false, Validators.required));

          }
          else {
            this.childForm.addControl(f.name, new FormControl({ value: "", disabled: false }, Validators.required));

          }

        }

      }

    }
    else {
      this.FileView = this.fileObject.length != 0 ? true : false;

    }
    // this.childForm.addControl('FileDat', new FormControl({ value: "", disabled: true }, Validators.required));

    // this.onValueChange()
  }

  onValueChange() {
    this.childForm.valueChanges.subscribe(val => {
      console.log(val);
    })
  }
  CheckCondition(condition) {
    return eval(condition);
  }
  onFileChange(event) {

    const name = this.fields[0].name
    this.childForm.get(name).enable()
    // this.childForm.patchValue({ [name]: event.target.files[0].name.split('.')[0] }); // added []
    this.childForm.patchValue({
      [this.fields[0].name]: event.target.files[0].name.split('.')[0],
      [this.fields[1].name]: this.fileEvent(event),
    })
    this.upload = false;



  }
  trackByFn(index: any, item: any) {
    return index;
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
    fileObjDetail.FileName = file.name.split('.')[0];

    return fileObjDetail;
  }
  DeleteFile(File ,index) {
    if (File.ID == undefined ) {
      console.log("delete");
      this.fileObject.splice(index,1)
      this.childForm.get(this.fields[0].name).reset();
    }
    else{
      let obj = {
        ID: File.ID,
        ActionValue: "delete"
      }
      this.FileUpload.emit(obj)

    }

  }

  SendCall(action) {
    let obj = {
      directCall: this.DirectCall,
      ActionValue: action
    }
    if (this.DirectCall == 'false' && action == "cancel") {
      // this.DeleteFile();
    }
    if (this.DirectCall == 'false' && action == "save") {
      this.FileView = true;
      // this.fileObject[0].FileDisplayName = this.childForm.controls[this.fields[0].name].value
      this.fileObject.push({
        FileDisplayName: this.childForm.controls[this.fields[0].name].value,
        UploadDate: formatDate(new Date(), 'yyyy/MM/dd', 'en'),
      })
    }
    if (this.DirectCall && action == "cancel") {
      this.FileUpload.emit(obj)

    }
    if (this.DirectCall && action == "save") {
      this.FileUpload.emit(obj)
    }

  }
}
