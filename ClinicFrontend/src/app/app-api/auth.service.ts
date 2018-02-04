//CORE
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//RXJS
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';

//TYPES
import { AuthState } from './auth-state';

//CONFIG
import { backendApiUrl } from './config';

@Injectable()
export class AuthService {
	timeout: number = 2000;
	
	//Broadcasts connection alerts
	connectionAlertObservable: Observable<any>;
	private connectionAlertSubject: Subject<any>;
	
	//Expose the user authentication state as an observable
	authObservable: Observable<AuthState>;
	private authSubject: BehaviorSubject<AuthState>;
	
	constructor(private http: HttpClient) {
		//Initialize connection alert
		this.connectionAlertSubject = new Subject();
		this.connectionAlertObservable = this.connectionAlertSubject.asObservable();
		
		//Set the initial Behaviour Subject state
		this.authSubject = new BehaviorSubject(AuthState.LoggedOut);
		this.authObservable = this.authSubject.asObservable();

		//Get the initial state through token storage, may be async so do this after initializing authSubject
		let state: AuthState;
		if (localStorage.getItem('token') != null) {
			this.validateToken().take(1).subscribe((isValid) => {
				if (isValid) {
					//If the token is valid, set the state to logged in
					this.authSubject.next(AuthState.Admin);
				} else {
					//If the token is invalid, set the state to logged out and clear the faulty token
					this.authSubject.next(AuthState.LoggedOut);
				}
			});
		}
	}
	
	//Attempt to login by getting a JWT
	login(email: string, password: string): Observable<AuthState> {
		return this.http.post(`${backendApiUrl}/authentication/login`, { email: email, password: password })
		.timeout(this.timeout)
		.take(1)
		.map((response) => {
			//Update the JWT
			localStorage.setItem('token', response['token']);
			return true;
		})
		.catch((error) => {
			//If we get a 400 error status, the login was simply wrong - return false
			if (error.status === 400) {
				return Observable.of(false);
			} 
			//Otherwise, propagate the error for additional (optional) handling
			else {
				this.connectionAlertSubject.next(error);
				throw error;
			}
		})
		.flatMap((success) => {
			//Update the auth status based on the login results
			if (success) {
				this.authSubject.next(AuthState.Admin);
			} else {
				this.authSubject.next(AuthState.LoggedOut)
			}

			//Return the auth observable
			return this.authObservable;
		});
	}
	
	//Logout by updating the Behavior Subject and clearing the JWT from local storage
	logout(): void {
		this.clearToken();
		this.authSubject.next(AuthState.LoggedOut);
	}
	
	//Returns the JWT from local storage
	getToken() {
		return localStorage.getItem('token');
	}
	
	//Verify that the JWT in local storage is valid
	validateToken(): Observable<boolean> {
		//If a token is stored, verify its integrity
		if (localStorage.getItem('token') != null) {

			//Get the JWT. This will be sent along side the request.
			let headers: HttpHeaders = new HttpHeaders({
				'Authorization': `Bearer ${this.getToken()}`
			});

			//Send the request, along with the token, to the backend
			return this.http.get(`${backendApiUrl}/authentication/check-token`, { headers: headers })
			.timeout(this.timeout)
			//Default to success...
			.map(() => true)
			//...but if an error is thrown (bad status code or timeout), set to false
			.catch((error) => { 
				this.clearToken();
				return Observable.of(false)
			});
		} 
		//If we don't have a token, return false
		else {
			return Observable.of(false);
		}
	}

	//Clear the JWT from storage
	private clearToken() {
		localStorage.removeItem('token');
	}
}
