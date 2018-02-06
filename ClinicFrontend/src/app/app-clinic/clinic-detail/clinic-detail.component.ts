//Ng CORE
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

//Ng MATERIAL
import { MatSnackBar } from '@angular/material';

//RXJS
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';

//SERVICES
import { ClinicService } from '../../app-api/clinic.service';
import { UserLocationService } from '../user-location.service';

//TYPES
import { Clinic } from '../../app-api/clinic';
import { Coords } from '../../app-api/coords';


@Component({
	selector: 'app-clinic-detail',
	templateUrl: './clinic-detail.component.html',
	styleUrls: ['./clinic-detail.component.css']
})
export class ClinicDetailComponent implements OnInit {
	clinic: Clinic;
    
	constructor(private activatedRoute: ActivatedRoute, private clinicService: ClinicService) {}

	ngOnInit() {
		//Chain the route and clinic service observables to get the correct clinic
		this.activatedRoute.params.mergeMap((params) => {
			return this.clinicService.getClinicById(+params['clinic-id']);
		}).take(1).subscribe((clinic) => this.clinic = clinic);
	}
	
	//Open the directions in google maps via simple window navigation
	getDirections() {
		if (this.clinic) {
			window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${this.clinic.lat},${this.clinic.lng}`;
		}
	}
}
