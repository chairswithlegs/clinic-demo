import { Component } from '@angular/core';

//Ng MATERIAL
import { MatDialog } from '@angular/material';

//RXJS
import { Observable } from 'rxjs/Observable';

//COMPONENTS AND DIRECTIVES
import { EditWaitTimeComponent } from '../edit-wait-time/edit-wait-time.component';
import { ConfirmDeletionComponent } from '../confirm-deletion/confirm-deletion.component';

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
    clinicToUpdate: Clinic;

    constructor(private authService: AuthService, private clinicService: ClinicService, private dialog: MatDialog) {
        this.clinics = clinicService.clinicsObservable;
     }
    
    editWaitTime() {
        this.dialog.open(EditWaitTimeComponent);
    }
    
    confirmDeletion() {
        this.dialog.open(ConfirmDeletionComponent).afterClosed().subscribe((confirmed:boolean) => {
            if (confirmed == true) {
                console.log("deleted the clinic");
            }
        });
    }
}
