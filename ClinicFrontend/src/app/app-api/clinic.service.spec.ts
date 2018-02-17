import { TestBed, inject } from '@angular/core/testing';
import { ClinicService } from './clinic.service';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Clinic } from './clinic';
import { Observable } from 'rxjs/Observable';
import { backendApiUrl } from './config';

//private http: HttpClient, private authService: AuthService
class MockHttpClient {
    get(url, options) {
        let clinic = new Clinic();
        clinic.id = 1;

        if (url == `${backendApiUrl}/clinics/1`) {
            return Observable.of(clinic);
        } else if (url == `${backendApiUrl}/clinics`) {
            return Observable.of([clinic]);
        }
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

    it('should return a clinic with a specific id', inject([ClinicService], async(service: ClinicService) => {
        service.getClinicById(1).take(1).subscribe((clinic) => {
            expect(clinic.id).toBe(1);
        });
    }));

    it('should put the updated clinic', inject([ClinicService], async(service: ClinicService) => {

    }));
});
