import { Component, OnInit, ViewChild, Renderer2, SecurityContext } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from '../../user-data.service';
import { InfoPanelComponent } from 'src/app/Shared/info-panel/info-panel.component';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from 'src/app/Shared/dialog-box/dialog-box.component';
import { DialogService } from 'src/app/Shared/services/dialog.service';
import { ToastrService } from 'ngx-toastr';
import { CanComponentDeactivate } from 'src/app/Guards/DeActicateGuard';
import { loadingConfig } from 'src/app/const/config';

@Component({
  selector: 'app-anchor-edit',
  templateUrl: './anchor-edit.component.html',
  styleUrls: ['./anchor-edit.component.scss']
})

export class AnchorEditComponent implements OnInit, CanComponentDeactivate {
  public UiObject: any = []
  active = 3;
  public form = new FormGroup({});
  unsubcribe: any

  public Status: any;
  AnchorObject: any = []
  AnchorID: number;
  sendObject: any = {};
  public showSpinner: boolean = false;
  public spinnerConfig: any;

  constructor(private route: ActivatedRoute,
    private _dataService: UserDataService,
    private _router: Router,
    private _domSanitizer: DomSanitizer,
    private _modalCustomService: DialogService,
    private _toaster: ToastrService
  ) {
    this.route.params.subscribe(params => {
      this.AnchorID = +params['id'];
      if (this.AnchorID) {
        this.showSpinner = true;

        this._dataService.GetCalls("anchors", this.AnchorID)
          .then((data: any) => {
            this.AnchorObject = data;
            this.Status = data.Data.Status
            this.form.addControl("ID", new FormControl(data.Data.ID));
            this.showSpinner = false;
          }).catch(err => {
            this.showSpinner = false;
          });
      }
      else {
        this.Status = -1
        this.AnchorObject.push({ ID: 0 });
        this.form.addControl("ID", new FormControl(0));
      }
    });
  }

  canDeactivate() {
    if (this.form.dirty) {
      return false;
    }

    return true;
  }

  ngOnInit(): void {
    this.UiObject = this.route.snapshot.data.UIdata[0]
    this.spinnerConfig = loadingConfig;
    // this.UiObject = await this.getUiData();
    // await this.CreateForm()
  }

  CreateForm() {
    return new Promise((resolve, reject) => {
      this.UiObject.Controls[0].Controls.forEach(element => {
        element.Controls.forEach(ele => {
          this.form.addControl(ele.Type + ele.ID, new FormGroup({}))
        });
      });
      //console.log(this.form)
    });
  }

  getInnerControls(obj: any) {
    let field: any[] = [];
    // this.form.addControl(obj.Type+obj.ID,this.builder.group([]))
    let tempArray = this.form.get(obj.Type + obj.ID) as FormArray;
    let fg = new FormGroup({});

    obj.Controls.forEach(element => {
      let f: any = {}
      f.type = element.Type;
      f.name = element.Options.name;
      f.label = element.Options.label;
      f.validators = element.Options.validators;
      f.inputType = element.Options.texttype != null ? element.Options.texttype : 'text'
      f.readonly = element.Options.readonly;
      if (this.Status >= 0 && this.AnchorObject.Data[element.Options.name] != null) {
        f.value = this.AnchorObject.Data[element.Options.name]
      }
      if (element.Type != 'Button') {
      }
      // if (element.Type == 'DateRangePicker' || element.Type == 'Button') {
      f.options = element.Options;
      // }
      field.push(f);
    });

    return field;
  }

  getSelectOptions(dataSource) {
    return new Promise((resolve, reject) => {
      this._dataService.GetCalls("utility/", dataSource)
        .then(val => {
          resolve(val)
        });
    });
  }

  getChildComponent(TypeID) {
    if (TypeID == 8) {
      return InfoPanelComponent;
    }
  }

  SaveData(action) {
    // this.Mapper(Event);
    switch (action) {
      case "Reject":
        if (this.form.valid) {
          this.showSpinner = true;
          this._dataService.PostCalls("anchors/reject", { ID: this.form.get('ID').value })
            .then(val => {
              this._toaster.success("Rejected successfully.");
              this.showSpinner = false;
              this.navigate();
            }).catch(err => {
              this.showSpinner = false;
            });
        }
        break;
      case "Create":
        if (this.form.valid) {
          // this.form.controls['AnchorCode'].enable();
          this.showSpinner = true;
          this._dataService.PostCalls("anchors/save", this.form.value)
            .then((val: any) => {
              this.showSpinner = false;
              if (val.Found) {
                this._modalCustomService.OpenTimedDialog({ heading: "User Already Exist", type: 4 });
              }
              else {
                // this._modalCustomService.OpenTimedDialog({heading:"Created Successfully",type:1})
                this._toaster.success("Created successfully.");
                this.navigate();
              }
              // this.Status=val.Status;
              //console.log(val);
            }).catch(err => {
              this.showSpinner = false;
            });
        }
        break;
      case "Cancel":
        this.navigate();
        break;
      case "Send Offer":
        if (this.form.valid) {
          this.showSpinner = true;
          this.form.addControl("AnchorCode", new FormControl(this.AnchorObject.Data.AnchorCode));
          this.form.controls['AnchorCode'].enable();
          this._dataService.PostCalls("offer/create", this.form.value)
            .then((val: any) => {
              this.form.controls['AnchorCode'].disable();

              if (val.Status == 201) {
                this._modalCustomService.OpenTimedDialog({ heading: val.Message, type: 4 });
              }
              else {
                this.navigate();
              }
              this.showSpinner = false;
            }).catch(err => {
              this.showSpinner = false;
              this.form.controls['AnchorCode'].disable();
            });
        }
        break;
      default:
        break;
    }
  }

  getForm(val) {
    return this.form.get(val);
  }
  change(val) {
    //console.log(val)
  }

  FileUploadAPI(Action) {
    this.form.addControl("AnchorCode", new FormControl(this.AnchorObject.Data.AnchorCode));
    this.form.controls['AnchorCode'].enable();
    //console.log(this.form)
    switch (Action.ActionValue) {
      case "cancel":
        this.navigate();
        break;
      case "delete":
        this.showSpinner = true;
        this._dataService.PostCalls("offer/deleteagreement", { ID: Action.ID, AnchorCode: this.AnchorObject.Data.AnchorCode })
          .then(val => {
            this.navigate();
          }).catch(err => {
            this.showSpinner = false;
          });
        break;
      case "save":
        if (this.form.valid) {
          this.showSpinner = true;
          this.form.addControl("AnchorCode", new FormControl(this.AnchorObject.Data.AnchorCode));
          //console.log(this.form.controls['signed'].value)
          if (this.form.controls['signed'].value == true) {
            this._dataService.PostCalls("offer/signedoffer", this.form.value)
              .then((val: any) => {
                if (val.Status == 201) {
                  this._modalCustomService.OpenTimedDialog({ heading: val.Message, type: 4 });
                }
                else {
                  this.navigate();
                }
                this.showSpinner = false;
              }).catch(err => {
                this.showSpinner = false;
              });
          } else {
            this._dataService.PostCalls("offer/agreement", this.form.value)
              .then((val: any) => {
                if (val.Status == 201) {
                  this._modalCustomService.OpenTimedDialog({ heading: val.Message, type: 4 });
                }
                else {
                  this.navigate();
                }
                this.showSpinner = false;
              }).catch(err => {
                this.showSpinner = false;
              });
          }
        }
        break;
      default:
        break;
    }
  }

  navigate() {
    this.form.reset();
    this._router.navigate(['/User/Anchor'], { state: { ParentID: -1, MenuID: -1, URL: "/User/Anchor" } });
  }

  Mapper(obj: any) {
    Object.keys(obj).forEach((key, idx) => {
      this.sendObject[key] = obj[key];
    });
  }

  CheckCondition(val) {
    return eval(val);
  }

  getFileObject(inner) {
    let obj = inner.Controls.filter(ele => {
      if (ele.Type == "Collection") {
        return ele.Options.name;
      }
    });
    return this.AnchorObject[obj[0].Options.name];
  }

  FileEvent(Action) {
    this.DownloadFile(Action.ID);
  }

  DownloadFile(ID) {
    this._dataService.GetCalls("FileUpload", ID)
      .then((res: any) => {
        if (res.FileData.data && res.FileData.data.length) {
          let typedArray = new Uint8Array(res.FileData.data);
          const stringChar = typedArray.reduce((data, byte) => {
            return data + String.fromCharCode(byte);
          }, '');
          let base64String = btoa(stringChar);
          let doc = this._domSanitizer.bypassSecurityTrustUrl(`data:application/octet-stream;base64, ${base64String}`) as string;
          doc = this._domSanitizer.sanitize(SecurityContext.URL, doc);
          const downloadLink = document.createElement("a");
          const fileName = res.FileDisplayName + "." + res.FileType;
          downloadLink.href = doc;
          downloadLink.download = fileName;
          downloadLink.click();
        }
        //console.log(res);
      });
  }
}