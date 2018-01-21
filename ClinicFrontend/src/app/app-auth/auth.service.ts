import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthState } from './auth-state';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class AuthService {

  authObservable: Observable<AuthState>;
  private authSubject: BehaviorSubject<AuthState>;

  constructor() { 
    this.authSubject = new BehaviorSubject(AuthState.ClinicAdmin);
    this.authObservable = this.authSubject.asObservable();
  }

  login(name: string, password: string): Observable<AuthState> {
    return Observable.create((observer: Observer<AuthState>) => {
      //Make async call here to api
      //Call the following when completed
     
      //If invalid signin
      //observer.error('Error');
      //Otherwise...
      observer.next(AuthState.ClinicAdmin);
      this.authSubject.next(AuthState.ClinicAdmin);
    });
  }

  logout() {
    this.authSubject.next(AuthState.LoggedOut);
  }
}
