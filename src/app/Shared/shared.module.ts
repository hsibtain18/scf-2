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
import { RouterModule } from '@angular/router';
import { InfoPanelComponent } from './info-panel/info-panel.component';


@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    GridComponent,
    InfoPanelComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule 
  ],
  exports: [
    HeaderComponent,
    NavigationComponent,
    GridComponent,
    NgbModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule,
    InfoPanelComponent 

  ],
  providers:[
    EncryptDecryptService
  ]
})
export class SharedModule { }
