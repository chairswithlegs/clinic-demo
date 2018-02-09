import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ClinicLocationService } from './clinic-location.service';

class MockHttpClient {
    
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
});
