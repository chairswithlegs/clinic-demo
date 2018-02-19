//Ng CORE
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//RXJS
import { Observable } from 'rxjs/Observable';

//SERVICES
import { UserLocationService } from '../user-location.service';

//TYPES
import { Clinic } from '../../app-api/clinic';
import { Coords } from '../../app-api/coords';


@Component({
	selector: 'app-clinic-map',
	templateUrl: './clinic-map.component.html',
	styleUrls: ['./clinic-map.component.css']
})
export class ClinicMapComponent implements OnInit {
	@Output() clinicClick: EventEmitter<Clinic> = new EventEmitter();
	@Input() clinics: Clinic[];
	@Input() center: Coords = { lat: 0, lng: 0 };
	userLocation: Coords;
	
	//Used to determine which icon is active, -1 means all icons are active
	private activeIndex = -1;
	
	constructor(private userLocationService: UserLocationService) {}
	
	ngOnInit() {
		this.userLocationService.getUserLocation().take(1).subscribe((coords) => this.userLocation = coords);
	}
	
	//Set the active marker
	setActiveMarker(index) {
		this.activeIndex = index;
	}
	
	//Make deactive marker/make all markers active
	deactivateMarker() {
		this.activeIndex = -1;
	}
}
