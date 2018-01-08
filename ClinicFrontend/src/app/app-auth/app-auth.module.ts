import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicAccountComponent } from './clinic-account/clinic-account.component';
import { AdminAccountComponent } from './admin-account/admin-account.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    ClinicAccountComponent,
    AdminAccountComponent
  ],
  declarations: [ClinicAccountComponent, AdminAccountComponent]
})
export class AppAuthModule { }
