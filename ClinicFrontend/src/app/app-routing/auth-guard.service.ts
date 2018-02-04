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
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';


@Injectable()
export class AuthGuardService implements CanActivate {
	
	constructor(private authService: AuthService, private router: Router) { }
	
	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		return this.authService.authObservable
		.timeout(2000)
		.map((authState) => {
			//Ensure expected AuthState is known
			if (route.data.expectedAuthState == undefined) {
				console.error('Expected AuthState must be set in Route data for AuthGuardService to work.');
				this.router.navigateByUrl('welcome');
				return false;
			} else if (route.data.expectedAuthState == authState) {
				//If correct state is supplied, allow the route change
				return true;
			} else {
				//If the wrong state is supplied, redirect to welcome page
				this.router.navigateByUrl('welcome');
				return false;
			}
		}).take(1);
	}
}
