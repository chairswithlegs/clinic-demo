import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClinicService } from '../clinic.service';
import { ClinicMapComponent } from '../clinic-map/clinic-map.component';
import { PageEvent } from '@angular/material/paginator';
import { Clinic } from '../clinic';
import { Coords } from '../coords';

@Component({
    selector: 'app-clinic-list',
    templateUrl: './clinic-list.component.html',
    styleUrls: ['./clinic-list.component.css']
})
export class ClinicListComponent {
    clinics: Observable<Clinic[]>;
    mapCenter: Coords = { lat: 43.5, lng: -70.4 }

    //Used to display list
    resultsPerPage: number = 7;
    pageStart: number = 0;
    pageEnd: number = this.resultsPerPage;


    constructor(private clinicService: ClinicService) {
        this.clinics = clinicService.clinicsObservable;
    }

    //Update list in response to Paginator events
    updatePageRange(pageEvent: PageEvent) {
        this.pageStart = pageEvent.pageIndex * this.resultsPerPage;
        this.pageEnd = this.pageStart + this.resultsPerPage;
        console.log(this.pageEnd);
    }
}
