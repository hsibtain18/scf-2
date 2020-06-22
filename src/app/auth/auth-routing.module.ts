import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ChangePasswordComponent } from './change-password/change-password.component';


const routes: Routes = [
  {
    path:'',
    component:AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'forgot', component: ForgotComponent },
      { path: 'reset', component: ChangePasswordComponent },
      { path: '**', redirectTo: 'login' }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
