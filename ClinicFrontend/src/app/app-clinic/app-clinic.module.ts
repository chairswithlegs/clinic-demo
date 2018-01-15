import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material/app-material.module';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'; 
import { AgmCoreModule } from '@agm/core';
import { TimeModule } from '../time/time.module';
import { ClinicListComponent } from './clinic-list/clinic-list.component';
import { ClinicDetailComponent } from './clinic-detail/clinic-detail.component';
import { ClinicMapComponent } from './clinic-map/clinic-map.component';
import { ClinicService } from './clinic.service';
import { GoogleApiKey } from './google-api-key';
import { LocationService } from './location.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    AppMaterialModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: GoogleApiKey
    }),
    TimeModule,
    FormsModule
  ],
  exports: [
    ClinicListComponent,
    ClinicDetailComponent
  ],
  providers: [ClinicService, LocationService],
  declarations: [ClinicListComponent, ClinicDetailComponent, ClinicMapComponent]
})
export class AppClinicModule { }
