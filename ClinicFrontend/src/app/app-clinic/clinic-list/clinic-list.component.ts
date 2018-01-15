import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClinicService } from '../clinic.service';
import { Clinic } from '../clinic';
import { ClinicMapComponent } from '../clinic-map/clinic-map.component';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-clinic-list',
    templateUrl: './clinic-list.component.html',
    styleUrls: ['./clinic-list.component.css']
})
export class ClinicListComponent implements OnDestroy{
    clinics: Clinic[];

    //Used by paginator.
    resultsPerPage: number = 7;
    pageStart: number = 0;
    pageEnd: number = this.resultsPerPage;

    //Used by the template to highlight markers.
    @ViewChild(ClinicMapComponent) clinicMap: ClinicMapComponent; 

    //Must unsubscribe from Clinic Observable to prevent a memory leak
    private unsubscribeClinicService: Function;
    
    constructor(private clinicService: ClinicService) {
        //Get the unsubscribe function reference. See ngOnDestroy.
        this.unsubscribeClinicService = clinicService.clinicsObservable.subscribe(clinics => {
            this.clinics = clinics;
        }).unsubscribe;
    }
    
    ngOnDestroy() {
        this.unsubscribeClinicService();
    }

    updatePageRange(pageEvent: PageEvent) {
        this.pageStart = pageEvent.pageIndex * this.resultsPerPage;
        this.pageEnd = Math.min(this.pageStart + this.resultsPerPage, this.clinics.length);
    }
}
