import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';


const routes: Routes = [
  {
    path:'auth',
    loadChildren: './auth/auth.module#AuthModule'
    
  },
  {
    path:'User',
    loadChildren: './admin/admin.module#AdminModule'
    
  },
  {
    path:'**',
    redirectTo:"auth"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
