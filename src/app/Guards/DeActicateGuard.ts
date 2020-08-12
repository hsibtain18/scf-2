import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogBoxComponent } from '../Shared/dialog-box/dialog-box.component';
export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}
@Injectable({
    providedIn: 'root'
})
export class DeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    constructor(private _modalService: NgbModal) { }
    canDeactivate(component: CanComponentDeactivate,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
        nextState?: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (!component.canDeactivate()) {
            return this.openDialogBox().then(val => val);
        } else {
            return true;
        }
    }
    openDialogBox() {
        const modalRef = this._modalService.open(DialogBoxComponent, {
            centered: true,
            keyboard: false,
            backdrop: 'static'
        });
        modalRef.componentInstance.DataObject = { buttons: { Yes: 'Discard', No: "Cancel" }, type: 3, titleTextColor: 'warning', title: 'Discard Changes', heading: 'Are you sure, you want to leave this page? Your changes will be discarded.', mode: 'confirmDialog' };
        return modalRef.result.then((result) => {
            return Promise.resolve(result);

        }, (reason) => {
            return Promise.resolve(false)
        });

    }

}