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

    put(url, clinic, header) {
        return Observable.of(true);
    }

    delete(id) {
        return Observable.of(true);
    }

    post(url, clinic, header) {
        return Observable.of(null);
    }
}

class MockAuthService {
    getToken() {
        return '1234';
    }
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
        //Create the mock clinic to be updated
        let clinic = new Clinic();
        clinic.id = 1;

        //Attempt to update the clinic
        service.updateClinic(clinic).take(1).subscribe((success) => {
            expect(success).toBe(true);

            //Verify that the clinic observable was also updated
            service.clinicsObservable.take(1).subscribe((clinics) => {
                expect(clinics[0].id).toBe(1);
            });
        });
    }));

    it('should delete the clinic', inject([ClinicService], async(service: ClinicService) => {
        //Try deleting a valid clinic...
        service.deleteClinic(1).take(1).subscribe((success) => {
            expect(success).toBe(true);
        });
    }));

    it('should create a clinic', inject([ClinicService], async(service: ClinicService) => {
        //Try creating a clinic
        service.createClinic(new Clinic()).take(1).subscribe((success) => {
            expect(success).toBe(true);

            //Verify that the clinic observable is updated
            service.clinicsObservable.take(1).subscribe((clinics) => {
                expect(clinics[0].id == 1);
            });
        });
    }));
});
