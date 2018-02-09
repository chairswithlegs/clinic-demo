import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuardService } from './auth-guard.service';
import { AuthService } from '../app-api/auth.service';

class MockAuthService {
    
}

describe('AuthGuardService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ RouterTestingModule ],
            providers: [
                AuthGuardService,
                { provide: AuthService, useClass: MockAuthService }
            ]
        });
    });
    
    it('should be created', inject([AuthGuardService], (service: AuthGuardService) => {
        expect(service).toBeTruthy();
    }));
});
