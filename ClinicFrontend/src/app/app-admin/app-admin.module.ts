//This module provides admin controls

//MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';
import { TimeModule } from '../time/time.module';

//COMPONENTS AND DIRECTIVES
import { LoginComponent } from './login/login.component';
import { EditWaitTimeComponent } from './edit-wait-time/edit-wait-time.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConfirmDeletionComponent } from './confirm-deletion/confirm-deletion.component';
import { UpdateClinicMenuComponent } from './update-clinic-menu/update-clinic-menu.component';
import { NewClinicFormComponent } from './new-clinic-form/new-clinic-form.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AppMaterialModule,
    TimeModule
  ],
  exports: [],
  entryComponents: [
    EditWaitTimeComponent,
    ConfirmDeletionComponent
  ],
  declarations: [
    LoginComponent, 
    EditWaitTimeComponent, 
    DashboardComponent, ConfirmDeletionComponent, UpdateClinicMenuComponent, NewClinicFormComponent
  ]
})
export class AppAdminModule { }
