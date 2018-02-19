import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthState } from '../app-api/auth-state';
import { Observable } from 'rxjs/Observable';

class MockHttpClient {
    post(url, body) {
        if (body.email == 'valid@valid.com' && body.password == 'valid') {
            return Observable.of({ 'token': '1234' });
        } else {
            return Observable.of(null);
        }
    }

    get() {
        return Observable.of(true);
    }
}

describe('AuthService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: HttpClient, useClass: MockHttpClient }
            ]
        });

        TestBed.compileComponents();
    });
    
    it('should be created', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));

    it('should login the user when credentials are valid', inject([AuthService], async(service: AuthService) => {
        service.login('valid@valid.com', 'valid').subscribe((authState) => {
            expect(authState).toBe(AuthState.Admin);
            //Clear the mock token for future tests
            service.logout();
        });
    }));

    it('should not login the user when credentials are invalid', inject([AuthService], async(service: AuthService) => {
        //Test login with invalid credentials
        service.login('invalid@invalid.com', 'invalid').take(1).catch(() => {
            service.authObservable.take(1).subscribe((authState) => {
                expect(authState).toBe(AuthState.LoggedOut);
            });
            return Observable.of(null);
        });
    }));
});
