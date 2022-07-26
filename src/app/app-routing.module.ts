import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { AuthGuard } from './Guards/AuthGuard';


const routes: Routes = [
  {
    path:'auth',
    loadChildren: './auth/auth.module#AuthModule'
    
  },
  {
    path:'User',
    loadChildren: './admin/admin.module#AdminModule',
    canActivate:[AuthGuard]

    
  },
  {
    path:'**',
    redirectTo:"auth"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
