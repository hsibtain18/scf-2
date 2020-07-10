import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../Shared/shared.module';
import { AnchorEditComponent } from './anchor/anchor-edit/anchor-edit.component';
import { AnchorListComponent } from './anchor/anchor-list/anchor-list.component';
import { LimitListComponent } from './limitapproval/limit-list/limit-list.component';
import { LimitViewComponent } from './limitapproval/limit-view/limit-view.component';
import { DynamicTestComponent } from './anchor/dynamic-test/dynamic-test.component';


@NgModule({
  declarations: [
    AdminComponent,
    AnchorListComponent, 
    AnchorEditComponent, 
    LimitListComponent, 
    LimitViewComponent, DynamicTestComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
