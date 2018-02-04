//Ng CORE
import { Directive, OnInit, OnDestroy} from '@angular/core';

//Ng MATERIAL
import { MatSnackBar } from '@angular/material';

//RXJS
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/merge';

//SERVICES
import { ClinicService } from '../app-api/clinic.service';
import { AuthService } from '../app-api/auth.service';
import { ClinicLocationService } from '../app-api/clinic-location.service';

@Directive({
  selector: '[ConnectionAlert]'
})
export class ConnectionAlertDirective implements OnInit, OnDestroy {
	
	private alertSubscription: Subscription;

	constructor(private snackBar: MatSnackBar, private clinicService: ClinicService, private authService: AuthService, private locationService: ClinicLocationService) {}
	
	ngOnInit() {
		this.alertSubscription = this.clinicService.connectionAlertObservable
		.merge(this.locationService.connectionAlertObservable, this.authService.connectionAlertObservable)
		.subscribe((response) => this.snackBar.open('Could not connect to server.', 'Dismiss'));
	}

	ngOnDestroy() {
		this.alertSubscription.unsubscribe();
	}
	
}

