import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AnchorListComponent } from './anchor/anchor-list/anchor-list.component';
import { AnchorEditComponent } from './anchor/anchor-edit/anchor-edit.component';
import { LimitListComponent } from './limitapproval/limit-list/limit-list.component';
import { LimitViewComponent } from './limitapproval/limit-view/limit-view.component';
import { UIResolverService } from '../Shared/services/uiresolver.service';
import { FinancingListComponent } from './financing/financing-list/financing-list.component';
import { FinancingViewComponent } from './financing/financing-view/financing-view.component';
import { ContractListComponent } from './contract/contract-list/contract-list.component';
import { ContractViewComponent } from './contract/contract-view/contract-view.component';
import { DeactivateGuard } from '../Guards/DeActicateGuard';


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
        }, canDeactivate: [DeactivateGuard]
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
        }
      },
      {
        path: 'Financing',
        component: FinancingListComponent,
        resolve: {
          UIdata: UIResolverService
        }
      },
      {
        path: "Financing/View/:id",
        component: FinancingViewComponent,
        resolve: {
          UIdata: UIResolverService
        }
      },
      {
        path: "Financing/Create",
        component: FinancingViewComponent,
        resolve: {
          UIdata: UIResolverService
        }
      },
      {
        path: 'Contract',
        component: ContractListComponent,
        resolve: {
          UIdata: UIResolverService
        }
      },
      {
        path: "Contract/View/:id",
        component: ContractViewComponent,
        resolve: {
          UIdata: UIResolverService
        }
      },
      {
        path: "Contract/Create",
        component: ContractViewComponent,
        resolve: {
          UIdata: UIResolverService
        }
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
