//CORE
import { Injectable } from '@angular/core';

//RXJS
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

//TYPES
import { AuthState } from './auth-state';


@Injectable()
export class AuthService {

  authObservable: Observable<AuthState>;
  private authSubject: BehaviorSubject<AuthState>;

  constructor() {
    //Get the initial state through token storage
    var state = AuthState.Admin;

    this.authSubject = new BehaviorSubject(state);
    this.authObservable = this.authSubject.asObservable();
  }

  login(name: string, password: string): Observable<AuthState> {
    return Observable.create((observer: Observer<AuthState>) => {
      //Make async call here to api
      //Call the following when completed
     
      //If invalid signin
      //observer.error('Error');
      //Otherwise...
      observer.next(AuthState.Admin);
      this.authSubject.next(AuthState.Admin);
    });
  }

  logout() {
    this.authSubject.next(AuthState.LoggedOut);
  }
}
