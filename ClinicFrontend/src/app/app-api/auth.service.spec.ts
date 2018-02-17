import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { AuthState } from '../app-api/auth-state';

class MockHttpClient {
    post(url, body) {
        if (body.email == 'valid@valid.com' && body.password == 'valid') {
            return { token: '1234' }
        } else {
            return null;
        }
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
    });
    
    it('should be created', inject([AuthService], (service: AuthService) => {
        expect(service).toBeTruthy();
    }));

    it('should login the user when credentials are valid', inject([AuthService], async(service: AuthService) => {
        //Test login with valid credentials
        service.login('valid@valid.com', 'valid').take(1).subscribe((authState) => {
            expect(authState).toBe(AuthState.Admin);
        });

        //Test login with invalid credentials
        service.login('invalid@invalid.com', 'invalid').take(1).subscribe((authState) => {
            expect(authState).toBe(AuthState.LoggedOut);
        });
    }));

    it('should log the user out', inject([AuthService], async(service: AuthService) => {
        //First, log the user in
        service.login('valid@valid.com', 'valid').take(1).subscribe((authState) => {
            expect(authState).toBe(AuthState.Admin);

            ///Then, log them out
            service.logout();
            service.authObservable.take(1).subscribe((authState) => {
                expect(authState).toBe(AuthState.LoggedOut);
            });
        });
    }));
});
