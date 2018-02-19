import { TestBed, inject, fakeAsync } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { ClinicLocationService } from './clinic-location.service';
import { AddressValidator } from './address-validator';
import { Observable } from 'rxjs/Observable';

class MockClinicLocationService {
	getClinicLocation(address: string) {
		if (address === 'valid') {
			return Observable.of({
				lat: 1,
				lng: 1
			});
		} else {
			return Observable.throw('error');
		}
	}
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
	
	it('should set the lat and lng controls when address is valid', inject([AddressValidator], async(addressValidator: AddressValidator) => {
		//Creat the controls for the mock form
		const lat = new FormControl();
		const lng = new FormControl();
		const address = new FormControl('valid');
		
		//Sanity checks
		expect(lat.value).toBe(null);
		expect(lng.value).toBe(null);
		expect(address.value).toBe('valid');
		
		//Check the address
		const validationFn = addressValidator.checkAddress(lat, lng);
		validationFn(address).take(1).subscribe((response) => {
			//Verify the repsponse is null (indicating a valid control) and that the coords are set
			expect(response).toBe(null);
			expect(lat.value).toBe(1);
			expect(lng.value).toBe(1);
		});
	}));
	
	it('should should clear lat and lng if address is invalid', inject([AddressValidator], (addressValidator: AddressValidator) => {
		//Creat the controls for the mock form
		const lat = new FormControl(1);
		const lng = new FormControl(1);
		const address = new FormControl('invalid');
		
		//Sanity checks
		expect(lat.value).toBe(1);
		expect(lng.value).toBe(1);
		expect(address.value).toBe('invalid');
		
		//Check the address
		const validationFn = addressValidator.checkAddress(lat, lng);
		validationFn(address).take(1).subscribe((response) => {
			//Verify the repsponse is not null (indicating something went wrong) and that the coords are cleared
			expect(response).not.toBe(null);
			expect(lat.value).toBe(null);
			expect(lng.value).toBe(null);
		});
	}));
});
