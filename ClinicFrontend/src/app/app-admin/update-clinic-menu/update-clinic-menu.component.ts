//Ng CORE
import { Component } from '@angular/core';

//Ng MATERIAL
import { MatDialog, MatSnackBar } from '@angular/material';

//RXJS
import { Observable } from 'rxjs/Observable';

//COMPONENTS AND DIRECTIVES
import { UpdateWaitTimeComponent } from '../update-wait-time/update-wait-time.component';
import { UpdateClinicProfileComponent } from '../update-clinic-profile/update-clinic-profile.component';
import { ConfirmDeletionComponent } from '../confirm-deletion/confirm-deletion.component';
import { UpdateLocationComponent } from '../update-location/update-location.component';

//SERVICES
import { ClinicService } from '../../app-api/clinic.service';
import { AuthService } from '../../app-api/auth.service';

//TYPES
import { Clinic } from '../../app-api/clinic';

@Component({
    selector: 'update-clinic-menu',
    templateUrl: './update-clinic-menu.component.html',
    styleUrls: ['./update-clinic-menu.component.css']
})
export class UpdateClinicMenuComponent {
    clinics: Observable<Clinic[]>;
    
    constructor(private clinicService: ClinicService, private dialog: MatDialog, private snackBar: MatSnackBar) {
        this.clinics = clinicService.clinicsObservable;
    }
    
    updateLocation(clinic: Clinic) {
        this.dialog.open(UpdateLocationComponent, { data: clinic }).afterClosed().subscribe((location) => {
            if (location != null) {
                clinic.address = location.address;
                clinic.lat = location.lat;
                clinic.lng = location.lng;

                this.clinicService.updateClinic(clinic).take(1).subscribe((success) => {
                    this.onClinicUpdate(success);
                });
            }
        });
    }
    
    updateClinicProfile(clinic: Clinic) {
        this.dialog.open(UpdateClinicProfileComponent, { data: clinic }).afterClosed().subscribe((profile) => {
            if (profile != null) {
                clinic.name = profile.name;
                clinic.description = profile.description;
                
                this.clinicService.updateClinic(clinic).take(1).subscribe((success) => {
                    this.onClinicUpdate(success);
                });
            }
        });
    }
    
    updateWaitTime(clinic: Clinic) {
        this.dialog.open(UpdateWaitTimeComponent).afterClosed().subscribe((waitTime) => {
            if (!isNaN(waitTime) && waitTime != null) {
                clinic.waitTime = waitTime;

                this.clinicService.updateClinic(clinic).take(1).subscribe((success) => {
                    this.onClinicUpdate(success);
                });
            }
        });
    }
    
    confirmDeletion(clinic: Clinic) {
        this.dialog.open(ConfirmDeletionComponent).afterClosed().subscribe((confirmed) => {
            if (confirmed === true) {
                this.clinicService.deleteClinic(clinic.id).take(1).subscribe((success) => {
                    this.onClinicUpdate(success);
                });
            }
        });
    }

    private onClinicUpdate(success: boolean) {
        //If the update was a success, get the latest clinic data from the backend 
        if (!success) {
            this.snackBar.open('Failed to save changes.', 'Dismiss');
        }
    }
}
