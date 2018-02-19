import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from '../app-api/auth.service';
import { Observable } from 'rxjs/Observable';
import { AuthState } from '../app-api/auth-state';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Router } from '@angular/router';

class MockAuthService {
    authObservable;
}

describe('AuthGuardService', () => {
    let authService: MockAuthService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule ],
            providers: [
                AuthGuardService,
                { provide: AuthService, useClass: MockAuthService }
            ]
        });

        authService = TestBed.get(AuthService);
        router = TestBed.get(Router);
    });
    
    it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
        expect(service).toBeTruthy();
    }));

    it('should allow authenticated users to access the route', inject([AuthGuardService], async(service: AuthGuardService) => {
        //Create a spy for page navigation
        let spy = spyOn(router, 'navigateByUrl');

        //Mock the auth and router states - authenticate the user
        authService.authObservable = Observable.of(AuthState.Admin);
        let routeSnapshot = new ActivatedRouteSnapshot();
        routeSnapshot.data = {
            expectedAuthState: AuthState.Admin
        }

        //Finally test the service using the good states
        service.canActivate(routeSnapshot).take(1).subscribe((success) => {
            expect(success).toBe(true);
            //Since the user should be authenticated, the user shouldn't be redirected
            expect(spy).not.toHaveBeenCalled();
        });
    }));

    it('should block unauthenticated users from accessing the route', inject([AuthGuardService], async(service: AuthGuardService) => {
        //Create a spy for page navigation
        let spy = spyOn(router, 'navigateByUrl');
        
        //Mock the auth and router states - don't authenticate the user
        authService.authObservable = Observable.of(AuthState.LoggedOut);
        let routeSnapshot = new ActivatedRouteSnapshot();
        routeSnapshot.data = {
            expectedAuthState: AuthState.Admin
        }

        //Finally test to make navigation is blocked
        service.canActivate(routeSnapshot).take(1).subscribe((success) => {
            expect(success).toBe(false);
            //Since the user is not authenticated, the user should be redirected
            expect(spy).toHaveBeenCalled();
        });
    }));
});
