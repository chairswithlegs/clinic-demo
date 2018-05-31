import { TestBed, inject } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { ClinicLocationService } from './clinic-location.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import { backendApiUrl } from './config';
import { AuthService } from './auth.service';

class MockHttpClient {
	get(address, options) {
		console.log(address);
		if (address === `${backendApiUrl}/clinics/address/valid`) {
			console.log('it has the correct url');
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

class MockAuthService {
	getToken() {
		return '1234';
	}
}

describe('ClinicLocationService', () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				ClinicLocationService,
				{ provide: HttpClient, useClass: MockHttpClient },
				{ provide: AuthService, useClass: MockAuthService }
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
			expect(coords).toBeNull();
		});
	}));
});
