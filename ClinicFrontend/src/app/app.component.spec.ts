import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ClinicService } from './app-api/clinic.service';
import { AuthService } from './app-api/auth.service';
import { ClinicLocationService } from './app-api/clinic-location.service';
import { AppMaterialModule } from './app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { MatSnackBar } from '@angular/material';

class MockClinicService {
	connectionAlertObservable = new Subject();
}

class MockAuthService {
	connectionAlertObservable = new Subject();
}

class MockClinicLocationService {
	connectionAlertObservable = new Subject();
}

class MockSnackBar {
	open() {}
}

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;
	let snackbar: MockSnackBar;
	let clinicService: MockClinicService;
	let authService: MockAuthService;
	let locationService: MockClinicLocationService;
	
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule,
				AppMaterialModule
			],
			declarations: [
				AppComponent
			],
			providers: [
				{ provide: ClinicService, useClass: MockClinicService },
				{ provide: AuthService, useClass: MockAuthService },
				{ provide: ClinicLocationService, useClass: MockClinicLocationService },
				{ provide: MatSnackBar, useClass: MockSnackBar }
			],
			schemas: [ NO_ERRORS_SCHEMA ]
		}).compileComponents();
	}));
	
	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		snackbar = TestBed.get(MatSnackBar);
		clinicService = TestBed.get(ClinicService);
		authService = TestBed.get(AuthService);
		locationService = TestBed.get(ClinicLocationService);
	});
	
	it('should create the app', async() => {
		expect(component).toBeTruthy();
	});
	
	it('should subscribe to the api services and alert the user of connection errors', async() => {
		const spy = spyOn(snackbar, 'open');
		
		//Have each of the 3 services emit an alert
		clinicService.connectionAlertObservable.next('error');
		authService.connectionAlertObservable.next('error');
		locationService.connectionAlertObservable.next('error');
		
		//Wait observables to resolve
		fixture.whenStable();
		
		//Expect the snackbar to have been opened for each of the 3 alerts
		expect(spy).toHaveBeenCalledTimes(3);
	});
});
