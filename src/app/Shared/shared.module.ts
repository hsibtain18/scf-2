import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { GridComponent } from './grid/grid.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { EncryptDecryptService } from './services/encrypt-decrypt.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from '@hardpool/ngx-spinner';


@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    GridComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ],
  exports: [
    HeaderComponent,
    NavigationComponent,
    GridComponent,
    NgbModule,
    ReactiveFormsModule,
    NgxSpinnerModule

  ],
  providers:[
    EncryptDecryptService
  ]
})
export class SharedModule { }
