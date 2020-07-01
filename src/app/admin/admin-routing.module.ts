import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AnchorListComponent } from './anchor/anchor-list/anchor-list.component';
import { AnchorEditComponent } from './anchor/anchor-edit/anchor-edit.component';
import { LimitListComponent } from './limitapproval/limit-list/limit-list.component';


const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:"anchor",
        component:AnchorListComponent
      },
      {
        path:"anchor/view/:id",
        component:AnchorEditComponent
      },
      {
        path:"limitApprover",
        component:LimitListComponent
      },
      {
        path:"limitApprover/view/:id",
        component:AnchorEditComponent
      },
      {
        path:"**",
        redirectTo:'anchor'

      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
