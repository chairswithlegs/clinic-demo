import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Clinic } from '../clinic';
import { ClinicService } from '../clinic.service';

@Component({
	selector: 'app-clinic-detail',
	templateUrl: './clinic-detail.component.html',
	styleUrls: ['./clinic-detail.component.css']
})
export class ClinicDetailComponent {
	clinic: Observable<Clinic>;
	
	constructor(private activatedRoute: ActivatedRoute, private clinicService: ClinicService) {
		this.clinic = Observable.zip(activatedRoute.params, clinicService.clinicsObservable, (params, clinics) => {
			return clinics.find((clinic) => clinic.id == +params['clinic-id']);
		});
	}
	
	onDirections() {
		this.clinic.subscribe((clinic) => {
			console.log(`https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lng}`);
			window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lng}`;
		}).unsubscribe();
	}
	
}
