//This module provides admin controls

//MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../app-material/app-material.module';
import { TimeModule } from '../time/time.module';

//COMPONENTS AND DIRECTIVES
import { ClinicAccountComponent } from './clinic-account/clinic-account.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';
import { LoginComponent } from './login/login.component';
import { EditWaitTimeComponent } from './edit-wait-time/edit-wait-time.component';


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
    EditWaitTimeComponent
  ],
  declarations: [
    ClinicAccountComponent, 
    AdminAccountComponent, 
    LoginComponent, 
    EditWaitTimeComponent
  ]
})
export class AppAuthModule { }
