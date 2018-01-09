import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material/app-material.module';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core';
import { TimeModule } from '../time/time.module';

import { ClinicListComponent } from './clinic-list/clinic-list.component';
import { ClinicDetailComponent } from './clinic-detail/clinic-detail.component';
import { ClinicMapComponent } from './clinic-map/clinic-map.component';
import { ClinicService } from './clinic.service';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBRcFE97OLC21OobG230jnhpYhNCr-gLMI'
    }),
    TimeModule
  ],
  exports: [
    ClinicListComponent,
    ClinicDetailComponent
  ],
  providers: [ClinicService],
  declarations: [ClinicListComponent, ClinicDetailComponent, ClinicMapComponent]
})
export class AppClinicModule { }
