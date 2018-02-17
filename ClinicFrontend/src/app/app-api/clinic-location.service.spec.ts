import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ClinicLocationService } from './clinic-location.service';
import { Observable } from 'rxjs/Observable';

//response['results'][0]['geometry']['location']
class MockHttpClient {
    get(address) {
        if (address == 'valid address') {
            return Observable.of({
                result: [{
                    geometry: {
                        location: {
                            lat: 1,
                            lng: 1
                        }
                    }
                }]
            });
        } else {
            return Observable.throw('error');
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
        service.getClinicLocation('valid address').take(1).subscribe((coords) => {
            expect(coords.lat).toBe(1);
            expect(coords.lng).toBe(1);
        });

        //Test an invalid address
        service.getClinicLocation('invalid address').take(1).subscribe((coords) => {
            expect(coords).toBe(null);
        });

    }));
});
