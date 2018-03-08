//This module offers the meat of the application, i.e. views of the clinic information

//MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material/app-material.module';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'; 
import { AgmCoreModule } from '@agm/core';
import { AppApiModule } from '../app-api/app-api.module';
import { TimeModule } from '../time/time.module';

//COMPONENTS AND DIRECTIVES
import { ClinicListComponent } from './clinic-list/clinic-list.component';
import { ClinicDetailComponent } from './clinic-detail/clinic-detail.component';
import { ClinicMapComponent } from './clinic-map/clinic-map.component';

//SERVICES
import { UserLocationService } from './user-location.service';
import { ClinicService } from '../app-api/clinic.service';

//ENVIRONMENT
import { environment } from '../../environments/environment';


@NgModule({
	imports: [
		CommonModule,
		HttpModule,
		AppMaterialModule,
		RouterModule,
		AgmCoreModule.forRoot({
			//Enter your own Google maps API key here. Key restrictions can be set from the Google API console.
			apiKey: environment.googleApiKey
		}),
		AppApiModule,
		TimeModule,
		FormsModule
	],
	exports: [
		ClinicListComponent,
		ClinicDetailComponent
	],
	providers: [
		UserLocationService
	],
	declarations: [
		ClinicListComponent, 
		ClinicDetailComponent, 
		ClinicMapComponent
	]
})
export class AppClinicModule { }
