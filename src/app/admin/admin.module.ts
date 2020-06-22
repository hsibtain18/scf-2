import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SharedModule } from '../Shared/shared.module';
import { AnchorEditComponent } from './anchor/anchor-edit/anchor-edit.component';
import { AnchorListComponent } from './anchor/anchor-list/anchor-list.component';


@NgModule({
  declarations: [
    AdminComponent,
    AnchorListComponent, 
    AnchorEditComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
