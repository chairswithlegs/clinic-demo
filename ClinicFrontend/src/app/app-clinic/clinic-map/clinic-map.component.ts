import { Component, Input } from '@angular/core';

import { Clinic } from '../clinic';

@Component({
    selector: 'app-clinic-map',
    templateUrl: './clinic-map.component.html',
    styleUrls: ['./clinic-map.component.css']
})
export class ClinicMapComponent {
    @Input() mapStyle = "";
    @Input() clinics: Clinic[];
    @Input() lat: number;
    @Input() lng: number;

    private inactiveOpacity: number = 0.5;
    private activeIndex: number = -1;

    setActiveMarker(index) {
        this.activeIndex = index;
    }

    deactivateMarker() {
        this.activeIndex = -1;
    }
}
