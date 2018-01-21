//Ng CORE
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//Ng MATERIAL
import { MatSnackBar } from '@angular/material';
import { PageEvent } from '@angular/material/paginator';

//RXJS
import { Observable } from 'rxjs/Observable';

//COMPONENTS AND DIRECTIVES
import { ClinicMapComponent } from '../clinic-map/clinic-map.component';

//SERVICES
import { ClinicService } from '../../app-api/clinic.service';

//TYPES
import { Clinic } from '../../app-api/clinic';
import { Coords } from '../../app-api/coords';


@Component({
    selector: 'app-clinic-list',
    templateUrl: './clinic-list.component.html',
    styleUrls: ['./clinic-list.component.css']
})
export class ClinicListComponent implements OnInit {
    clinics: Clinic[];
    mapCenter: Coords = { lat: 43.5, lng: -70.4 }

    //Used to display list
    resultsPerPage: number = 7;
    pageStart: number = 0;
    pageEnd: number = this.resultsPerPage;

    constructor(private clinicService: ClinicService, private router: Router, private snackbar: MatSnackBar) {}

    ngOnInit() {
        this.clinicService.getClinics().take(1).subscribe((clinics) => {
            this.clinics = clinics;
        }, (error) => {
            this.snackbar.open('Could not load clinic data.', 'Dismiss');
        });
    }

    //Update list in response to Paginator events
    private updatePageRange(pageEvent: PageEvent) {
        this.pageStart = pageEvent.pageIndex * this.resultsPerPage;
        this.pageEnd = this.pageStart + this.resultsPerPage;
        console.log(this.pageEnd);
    }

    private onClinicClick(clinic: Clinic) {
        this.router.navigateByUrl(`clinics/${clinic.id.toString()}`);
    }
}
