//CORE
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//RXJS
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';

//TYPES
import { AuthState } from './auth-state';

//CONFIG
import { backendApiUrl } from './config';

@Injectable()
export class AuthService {
	timeout: number = 2000;
	
	//Expose the user authentication state as an observable
	authObservable: Observable<AuthState>;
	private authSubject: BehaviorSubject<AuthState>;
	
	constructor(private http: HttpClient) {
		//Get the initial state through token storage
		let state: AuthState;
		if (localStorage.getItem('token') === null) {
			state = AuthState.LoggedOut;
		} else {
			state = AuthState.Admin;
		}
		
		//Set the initial Behaviour Subject state
		this.authSubject = new BehaviorSubject(state);
		this.authObservable = this.authSubject.asObservable();
	}
	
	//Attempt to login by getting a JWT
	login(email: string, password: string): Observable<AuthState> {
		return this.http.post(`${backendApiUrl}/authentication/login`, { email: email, password: password })
		.timeout(this.timeout)
		.map((response) => {
			//The http service won't perform the following if an error code is returned (it will throw an error)
			localStorage.setItem('token', response['token']);
			this.authSubject.next(AuthState.Admin);
			return AuthState.Admin;
		});
	}
	
	//Logout by updating the Behavior Subject and clearing the JWT from local storage
	logout(): void {
		localStorage.removeItem('token');
		this.authSubject.next(AuthState.LoggedOut);
	}
	
	//Returns the JWT from local storage
	getToken() {
		return localStorage.getItem('token');
	}
}
