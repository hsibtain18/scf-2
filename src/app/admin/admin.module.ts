import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../Shared/shared.module';
import { AnchorEditComponent } from './anchor/anchor-edit/anchor-edit.component';
import { AnchorListComponent } from './anchor/anchor-list/anchor-list.component';
import { LimitListComponent } from './limitapproval/limit-list/limit-list.component';
import { LimitViewComponent } from './limitapproval/limit-view/limit-view.component';
import { UIService } from './ui.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FileService } from '../Shared/services/fileService';
import { FinancingListComponent } from './financing/financing-list/financing-list.component';
import { FinancingViewComponent } from './financing/financing-view/financing-view.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ContractListComponent } from './contract/contract-list/contract-list.component';
import { ContractViewComponent } from './contract/contract-view/contract-view.component';
import { DeactivateGuard } from '../Guards/DeActicateGuard';

@NgModule({
  declarations: [
    AdminComponent,
    AnchorListComponent, 
    AnchorEditComponent, 
    LimitListComponent, 
    LimitViewComponent, FinancingListComponent, FinancingViewComponent, ContractListComponent, ContractViewComponent 
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    NgbModule
    // BrowserAnimationsModule,
    // BsDatepickerModule.forRoot(),
  ],
  providers:[UIService,FileService,DeactivateGuard]
})
export class AdminModule { }
