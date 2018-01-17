import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Clinic } from '../clinic';
import { ClinicService } from '../clinic.service';
import { LocationService } from '../location.service';
import { Coords } from '../coords';

@Component({
	selector: 'app-clinic-detail',
	templateUrl: './clinic-detail.component.html',
	styleUrls: ['./clinic-detail.component.css']
})
export class ClinicDetailComponent {
	clinic: Observable<Clinic>;
    
	constructor(private activatedRoute: ActivatedRoute, private clinicService: ClinicService) {
        //Combine the ActivatedRoute and ClinicService observables into a new single observable that returns a single clinic
        this.clinic = Observable.zip(activatedRoute.params, clinicService.clinicsObservable, (params, clinics) => {
			return clinics.find((clinic) => clinic.id == +params['clinic-id']);
        });
	}
	
	onDirections() {
		this.clinic.take(1).subscribe((clinic) => {
			window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lng}`;
		});
	}
}
