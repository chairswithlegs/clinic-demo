import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../../app-api/auth.service';
import { MatSnackBar } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthState } from '../../app-api/auth-state';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';

class MockAuthService {
	loginSuccess = false;
	
	login(email: string, password: string): Observable<AuthState> {
		if (email === 'test@test.com' && password === 'test') {
			this.loginSuccess = true;
			return Observable.of(AuthState.Admin);
		} else {
			return Observable.of(AuthState.LoggedOut);
		}
	}
}

class MockMatSnackBar {
	open = () => {};
}

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;
	let authService: MockAuthService;
	let snackBar: MockMatSnackBar;
	let router: Router;
	
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ 
				ReactiveFormsModule,
				RouterTestingModule
			],
			declarations: [ LoginComponent ],
			providers: [
				{ provide: AuthService, useClass: MockAuthService },
				{ provide: MatSnackBar, useClass: MockMatSnackBar }
			],
			schemas: [
				NO_ERRORS_SCHEMA
			]
		})
		.compileComponents();
	}));
	
	beforeEach(() => {
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		authService = TestBed.get(AuthService);
		snackBar = TestBed.get(MatSnackBar);
		router = TestBed.get(Router);
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
	
	it('should send email and password to authService', () => {
		//Monitor the page navigation
		const spy = spyOn(router, 'navigateByUrl');
		
		//Submit the form
		component.onSubmit(component.form);
		
		//Don't expect login to be called since fields should fail validation
		expect(authService.loginSuccess).toBe(false);
		
		//Set the form values
		component.form.controls.email.setValue('test@test.com');
		component.form.controls.password.setValue('test');
		fixture.detectChanges();
		
		//Submit the form
		component.onSubmit(component.form);
		
		//Expect log to be called since fields are filled
		expect(authService.loginSuccess).toBe(true);
		
		//Expect page navigation since login is valid
		expect(spy).toHaveBeenCalled();
	});
	
	it('should alert user if the email or password are invalid', async() => {
		//Monitor the mock snackbar
		const spy = spyOn(snackBar, 'open');
		
		//Set the form values
		component.form.controls.email.setValue('test@test.com');
		component.form.controls.password.setValue('INVALID');
		
		//Submit the form
		component.onSubmit(component.form);
		
		//Let the async login behavior complete
		fixture.whenStable();
		
		//Since the login credentials aren't valid, the snackbar should have been called
		expect(spy).toHaveBeenCalled();
	});
	
	it('should change the view once if the login succeeds', async() => {
		//Monitor the mock snackbar
		const spy = spyOn(router, 'navigateByUrl');
		
		//Set the form values
		component.form.controls.email.setValue('test@test.com');
		component.form.controls.password.setValue('test');
		
		//Submit the form
		component.onSubmit(component.form);
		
		//Let the async login behavior complete
		fixture.whenStable();
		
		//Since the login credentials are valid, the router navigation function should be called
		expect(spy).toHaveBeenCalled();
	});
});
