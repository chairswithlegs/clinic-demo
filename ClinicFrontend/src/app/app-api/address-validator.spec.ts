import { TestBed, inject } from '@angular/core/testing';

import { ClinicLocationService } from './clinic-location.service';
import { AddressValidator } from './address-validator';

class MockClinicLocationService {
    
}

describe('AddressValidator', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ClinicLocationService, useClass: MockClinicLocationService },
                AddressValidator
            ]
        });

    });
    
    it('should be created', inject([AddressValidator], (addressValidator: AddressValidator) => {
        expect(addressValidator).toBeTruthy();
    }));

    it('should set the lat and lng controls, and return a null observable, when the address control is valid', inject([AddressValidator], (addressValidator: AddressValidator) => {
        //TODO
    }));

    it('should clear the lat and lng controls, and return an error message observable, when the address control is invalid', inject([AddressValidator], (addressValidator: AddressValidator) => {
        //TODO
    }));
});