import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ClinicLocationService } from './clinic-location.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { googleApiKey } from './config';

class MockHttpClient {
    get(address) {
        if (address == `https://maps.googleapis.com/maps/api/geocode/json?address=valid&key=${googleApiKey}`) {
            return Observable.of({
                results: [
                    {
                        geometry: {
                            location: {}
                        }
                    }
                ]
            });
        } else {
            return Observable.of(null);
        }
    }
}

describe('ClinicLocationService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ClinicLocationService,
                { provide: HttpClient, useClass: MockHttpClient }
            ]
        });
    });
    
    it('should be created', inject([ClinicLocationService], (service: ClinicLocationService) => {
        expect(service).toBeTruthy();
    }));

    
    it('should get the clinic location', inject([ClinicLocationService], async(service: ClinicLocationService) => {
        //Test a valid address
        service.getClinicLocation('valid').take(1).subscribe((coords) => {
            expect(coords).not.toBeNull();
        });

        //Test an invalid address
        service.getClinicLocation('invalid').take(1).subscribe((coords) => {
            expect(coords).toBe(null);
        });
    }));
});
