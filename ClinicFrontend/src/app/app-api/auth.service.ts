//CORE
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//RXJS
import { ReplaySubject } from 'rxjs/ReplaySubject';
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
	private authSubject: ReplaySubject<AuthState>;
	
	constructor(private http: HttpClient) {
		//Set the initial Behaviour Subject state
		this.authSubject = new ReplaySubject();
		this.authObservable = this.authSubject.asObservable();

		//Get the initial state through token storage, may be async so do this after initializing authSubject
		let state: AuthState;
		if (localStorage.getItem('token') != null) {
			this.checkToken().take(1).subscribe((isValid) => {
				if (isValid) {
					//If the token is valid, set the state to logged in
					this.authSubject.next(AuthState.Admin);
				} else {
					//If the token is invalid, set the state to logged out and clear the faulty token
					this.authSubject.next(AuthState.LoggedOut);
					this.clearToken();
				}
			});
		}
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
		this.clearToken();
		this.authSubject.next(AuthState.LoggedOut);
	}
	
	//Returns the JWT from local storage
	getToken() {
		return localStorage.getItem('token');
	}
	
	//Clear the JWT from storage
	private clearToken() {
		localStorage.removeItem('token');
	}

	//Verify that the JWT in local storage is valid
	private checkToken(): Observable<boolean> {
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
		.catch((error) => { console.log(error); return Observable.of(false) });
	}
}
