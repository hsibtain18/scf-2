import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private _modalService: NgbModal
  ) { }


  OpenTimedDialog(Obj){
    const modelRef = this._modalService.open(DialogBoxComponent,{ 
      centered: true,
      keyboard: false,
      backdrop:'static'
     });
     modelRef.componentInstance.DataObject = Obj
  }
}
