//CORE
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

//RXJS
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//SERVICES
import { AuthService } from '../app-api/auth.service';

//TYPES
import { AuthState } from '../app-api/auth-state';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.authObservable.map((authState) => {
      if (authState == AuthState.LoggedOut) {
        this.router.navigateByUrl('welcome');
      } else {
        return true;
      }
    }).take(1);
  }

}
