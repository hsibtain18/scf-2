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
import { BuilderComponent } from './form/builder.component';
import { FieldBuilderComponent } from './form/field-builder/field-builder.component';
import { TextFieldComponent } from './form/form-component/textField';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SelectFieldComponent } from './form/form-component/selectField';
import { DateFieldComponent } from './form/form-component/dateField';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { InnerGridComponent } from './inner-grid/inner-grid.component';
import { TreeTableModule } from 'primeng/treetable'
import { TreeTableComponent } from './tree-table/tree-table.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { DialogService } from './services/dialog.service';
import { TableModule } from 'primeng/table';
import { FormCreateService } from './services/form-create.service';
import { EditTableComponent } from './edit-table/edit-table.component';
// import { TreeTableModule } from 'primeng/treetable';

@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    GridComponent,
    InfoPanelComponent,
    BuilderComponent,
    FieldBuilderComponent,
    TextFieldComponent,
    FileUploadComponent,
    SelectFieldComponent,
    DateFieldComponent,
    InnerGridComponent,
    TreeTableComponent,
    DialogBoxComponent,
    EditTableComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule,
    BsDatepickerModule.forRoot(),
    TreeTableModule,
    TableModule
  ],
  exports: [
    HeaderComponent,
    NavigationComponent,
    GridComponent,
    NgbModule,
    ReactiveFormsModule,
    NgxSpinnerModule,
    RouterModule,
    InfoPanelComponent,
    BuilderComponent,
    FileUploadComponent,
    SelectFieldComponent,
    BsDatepickerModule,
    InnerGridComponent,
    TreeTableModule,
    TableModule,
    TreeTableComponent,
    EditTableComponent,
    

  ],
  entryComponents: [
    DialogBoxComponent
  ],
  providers: [
    EncryptDecryptService, DialogService ,FormCreateService
  ]
})
export class SharedModule { }
