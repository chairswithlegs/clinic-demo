//Ng CORE
import { Component, OnInit, OnDestroy, Input } from '@angular/core';

//Ng MATERIAL
import { MatSnackBar } from '@angular/material';

//RXJS
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/merge';

//SERVICES
import { ClinicService } from './app-api/clinic.service';
import { AuthService } from './app-api/auth.service';
import { ClinicLocationService } from './app-api/clinic-location.service';

//TYPES
import { AuthState } from './app-api/auth-state';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
	//Expose the AuthState enum to the template
	loggedOut: AuthState = AuthState.LoggedOut;
	admin: AuthState = AuthState.Admin;
	
	//Manange the subscription lifetime
	private alertSubscription: Subscription;
	
	constructor(
		public snackBar: MatSnackBar,
		public clinicService: ClinicService,
		public authService: AuthService,
		public locationService: ClinicLocationService
	) {}
	
	ngOnInit() {
		this.alertSubscription = this.clinicService.connectionAlertObservable
		.merge(this.locationService.connectionAlertObservable, this.authService.connectionAlertObservable)
		.subscribe((response) => this.snackBar.open('Could not connect to server.', 'Dismiss'));
	}
	
	ngOnDestroy() {
		this.alertSubscription.unsubscribe();
	}
}
