import { TestBed, inject } from '@angular/core/testing';
import { ClinicService } from './clinic.service';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Clinic } from './clinic';
import { Observable } from 'rxjs/Observable';

//private http: HttpClient, private authService: AuthService
class MockHttpClient {
    get(url, options) {
        return Observable.of([new Clinic()]);
    }
}

class MockAuthService {
    
}

describe('ClinicService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ClinicService,
                { provide: HttpClient, useClass: MockHttpClient },
                { provide: AuthService, useClass: MockAuthService }
            ]
        });
    });
    
    it('should be created', inject([ClinicService], (service: ClinicService) => {
        expect(service).toBeTruthy();
    }));
});
