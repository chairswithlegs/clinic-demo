//Ng CORE
import { Injectable } from '@angular/core';
import { FormControl, AbstractControl, ValidationErrors } from '@angular/forms';

//RXJS
import { Observable } from 'rxjs/Observable';

//SERVICES
import { ClinicLocationService } from './clinic-location.service';

//TYPES
import { Coords } from './coords';


@Injectable()
export class AddressValidator {
	constructor(private clinicLocationService: ClinicLocationService) {}
	
	checkAddress(lat: AbstractControl, lng: AbstractControl) {
		return (addressControl: FormControl): Observable<ValidationErrors | null> => {
			lat.setValue(null);
			lng.setValue(null);
			
			return Observable.timer(500).switchMap(() => {
				return this.clinicLocationService.getClinicLocation(addressControl.value);
			})
			.map((coords: Coords) => {
				lat.setValue(coords.lat);
				lng.setValue(coords.lng);
				return null;
			})
			.catch((error) => {
				return Observable.of({ 'address': 'Could not find address location' });
			});
		};
	}
}
