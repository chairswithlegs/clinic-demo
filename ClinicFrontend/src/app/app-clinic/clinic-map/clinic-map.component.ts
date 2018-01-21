import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocationService } from '../location.service';
import { Clinic } from '../clinic';
import { Coords } from '../coords';
import { Observable } from 'rxjs/Observable';

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
    private activeIndex: number = -1;

    constructor(private locationService: LocationService) {}

    ngOnInit() {
        this.locationService.getUserLocation().take(1).subscribe((coords) => this.userLocation = coords);
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
