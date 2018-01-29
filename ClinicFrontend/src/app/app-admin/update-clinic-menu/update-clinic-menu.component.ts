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

//SERVICES
import { ClinicService } from '../../app-api/clinic.service';
import { AuthService } from '../../app-api/auth.service';

//TYPES
import { Clinic } from '../../app-api/clinic';
import { isString } from 'util';

@Component({
    selector: 'update-clinic-menu',
    templateUrl: './update-clinic-menu.component.html',
    styleUrls: ['./update-clinic-menu.component.css']
})
export class UpdateClinicMenuComponent {
    clinics: Observable<Clinic[]>;
    clinicToUpdate: Clinic;

    constructor(private authService: AuthService, private clinicService: ClinicService, private dialog: MatDialog, private snackBar: MatSnackBar) {
        this.clinics = clinicService.clinicsObservable;
     }

    updateClinicProfile(clinic: Clinic) {
        this.dialog.open(UpdateClinicProfileComponent, { data: clinic }).afterClosed().subscribe((profile) => {
            if (profile != null) {
                this.clinicService.updateClinicProfile(clinic.id, profile.name, profile.description).take(1).subscribe((success) => {
                    if (!success) {
                        this.snackBar.open('Failed to save changes.', 'Dismiss');
                    }
                });
            }
        });
    }
    
    updateWaitTime(clinic: Clinic) {
        this.dialog.open(UpdateWaitTimeComponent).afterClosed().subscribe((waitTime) => {
            if (!isNaN(waitTime)) {
                this.clinicService.updateWaitTime(clinic.id, waitTime).take(1).subscribe((success) => {
                    if (!success) {
                        this.snackBar.open('Failed to save changes.', 'Dismiss');
                    }
                });
            }
        });
    }
    
    confirmDeletion(clinic: Clinic) {
        this.dialog.open(ConfirmDeletionComponent).afterClosed().subscribe((confirmed) => {
            if (confirmed) {
                this.clinicService.deleteClinic(clinic.id).take(1).subscribe((success) => {
                    if (!success) {
                        this.snackBar.open('Failed to save changes.', 'Dismiss');
                    }
                });
            }
        });
    }
}
