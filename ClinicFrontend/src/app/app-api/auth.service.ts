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
    
    //Cache the validation state of the JWT
    private initialStateLoaded: boolean = false;

	constructor(private http: HttpClient) {
		//Initialize connection alert
		this.connectionAlertSubject = new Subject();
		this.connectionAlertObservable = this.connectionAlertSubject.asObservable();
        
    
		//Set the initial Behaviour Subject state - this won't be exposed until authObservable is set (see below)
        //Note: this is important since this initial value may not be accurate
        this.authSubject = new BehaviorSubject(AuthState.LoggedOut);
        
        //Wait to bind authObservable to its just until after the initial state has been determined by JWT validation
        //Note: switchMap changes what authObservable sucbscribes to (i.e. first the observable returned by GetInitialState(), then switches to authSubject)
        this.authObservable = this.GetInitialState().switchMap((authState) => {
            this.authSubject.next(authState);
            return this.authSubject;
        });
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
	getToken(): string {
		return localStorage.getItem('token');
	}
	
	//Verify that the JWT in local storage is valid
	private validateToken(clearInvalidToken: boolean): Observable<boolean> {
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
                console.log(error);
                //If we get a 401 (i.e. unauthorized) response, we know the token is invalid
                if (error.status == 401 && clearInvalidToken == true) {
                    this.clearToken();
                }
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
    
    //Loads the initial auth state
    private GetInitialState(): Observable<AuthState> {
        if (localStorage.getItem('token') == null) {
            return Observable.of(AuthState.LoggedOut);
        }
        else {
            return this.validateToken(true).take(1).map((valid) => {
                //Set the auth state based on the stored JWT validity
                if (valid) {
                    return AuthState.Admin;
                } else {
                    //The user will be set to logged out if the token is invalid
                    return AuthState.LoggedOut;
                }
            }).take(1);
        }
    }
}
