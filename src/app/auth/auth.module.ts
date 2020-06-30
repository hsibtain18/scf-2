import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthService } from './auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../Shared/shared.module';


@NgModule({
  declarations: [LoginComponent, ForgotComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule

  ],
  providers:[
    AuthService,
  ]
})
export class AuthModule { }
