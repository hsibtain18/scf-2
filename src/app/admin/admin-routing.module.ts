import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AnchorListComponent } from './anchor/anchor-list/anchor-list.component';
import { AnchorEditComponent } from './anchor/anchor-edit/anchor-edit.component';
import { LimitListComponent } from './limitapproval/limit-list/limit-list.component';
import { LimitViewComponent } from './limitapproval/limit-view/limit-view.component';
import { UIResolverService } from '../Shared/services/uiresolver.service';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: "Anchor",
        component: AnchorListComponent,
        resolve: {
          UIdata: UIResolverService
        }
      },
      {
        path: "Anchor/View/:id",
        component: AnchorEditComponent,
        resolve: {
          UIdata: UIResolverService
        }
      },
      {
        path: "Anchor/Create",
        component: AnchorEditComponent,
        resolve: {
          UIdata: UIResolverService
        }
      },
      {
        path: "LimitApproval",
        component: LimitListComponent,
        resolve: {
          UIdata: UIResolverService
        }
      },
      {
        path: "LimitApproval/View/:id",
        component: LimitViewComponent,
        resolve: {
          UIdata: UIResolverService
        },
        data: [{
          ParentID: null,
        }]
      },
      {
        path: "**",
        redirectTo: 'anchor'

      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
