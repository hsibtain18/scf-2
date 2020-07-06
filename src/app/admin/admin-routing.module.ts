import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AnchorListComponent } from './anchor/anchor-list/anchor-list.component';
import { AnchorEditComponent } from './anchor/anchor-edit/anchor-edit.component';
import { LimitListComponent } from './limitapproval/limit-list/limit-list.component';
import { LimitViewComponent } from './limitapproval/limit-view/limit-view.component';


const routes: Routes = [
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:"Anchor",
        component:AnchorListComponent
      },
      {
        path:"Anchor/View/:id",
        component:AnchorEditComponent,
        data :{}
      },
      {
        path:"LimitApproval",
        component:LimitListComponent
      },
      {
        path:"LimitApproval/View/:id",
        component:LimitViewComponent
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
