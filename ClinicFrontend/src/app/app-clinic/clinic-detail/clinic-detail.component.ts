import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/take';
import { Clinic } from '../clinic';
import { ClinicService } from '../clinic.service';
import { LocationService } from '../location.service';
import { Coords } from '../coords';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-clinic-detail',
	templateUrl: './clinic-detail.component.html',
	styleUrls: ['./clinic-detail.component.css']
})
export class ClinicDetailComponent implements OnInit {
	clinic: Clinic;
    
	constructor(private activatedRoute: ActivatedRoute, private clinicService: ClinicService, private snackbar: MatSnackBar) {}

	ngOnInit() {
		//Chain the route and clinic service observables to get the correct clinic
		this.activatedRoute.params.mergeMap((params) => {
			return this.clinicService.getClinicById(+params['clinic-id']);
		}).take(1).subscribe((clinic) => this.clinic = clinic, (error) => {
			this.snackbar.open('Could not load clinic data', 'Dismiss');
		});
	}
	
	//Open the directions in google maps via simple window navigation
	getDirections() {
		if (this.clinic) {
			window.location.href = `https://www.google.com/maps/dir/?api=1&destination=${this.clinic.lat},${this.clinic.lng}`;
		}
	}
}
