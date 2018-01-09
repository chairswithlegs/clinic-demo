import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ClinicService } from '../clinic.service';
import { Clinic } from '../clinic';

import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'app-clinic-list',
    templateUrl: './clinic-list.component.html',
    styleUrls: ['./clinic-list.component.css']
})
export class ClinicListComponent implements OnDestroy{
    
    clinics: Clinic[];
    //Required for Material table
    tableDataSource: MatTableDataSource<Clinic>;
    //Must unsubscribe from Clinic Observable to prevent a memory leak
    private unsubscribeClinicService: Function;
    
    constructor(private clinicService: ClinicService) {
        this.tableDataSource = new MatTableDataSource();
        
        //Get the unsubscribe function reference. See ngOnDestroy.
        this.unsubscribeClinicService = clinicService.clinicsObservable.subscribe(clinics => {
            this.clinics = clinics;
            this.tableDataSource.data = clinics;
        }).unsubscribe;
    }
    
    ngOnDestroy() {
        this.unsubscribeClinicService();
    }
}
