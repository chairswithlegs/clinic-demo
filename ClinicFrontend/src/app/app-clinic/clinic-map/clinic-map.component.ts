import { Component, Input } from '@angular/core';
import { LocationService } from '../location.service';
import { Clinic } from '../clinic';
import { Coords } from '../coords';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'app-clinic-map',
    templateUrl: './clinic-map.component.html',
    styleUrls: ['./clinic-map.component.css']
})
export class ClinicMapComponent {
    @Input() clinics: Clinic[];
    @Input() center: Coords;
    userLocation: Coords;

    private inactiveOpacity: number = 0.5;
    private activeIndex: number = -1;

    constructor(private locationService: LocationService) {
        //Attempt to add the user location to the map
        locationService.getUserLocation().take(1).subscribe((coords) => {
            this.userLocation = coords;
        });
    }

    setActiveMarker(index) {
        this.activeIndex = index;
    }

    deactivateMarker() {
        this.activeIndex = -1;
    }
}
