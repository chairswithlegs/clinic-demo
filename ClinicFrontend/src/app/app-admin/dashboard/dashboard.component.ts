//Ng CORE
import { Component} from '@angular/core';

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
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
    
    clinic: Clinic;
    
    constructor(private authService: AuthService, private clinicService: ClinicService, private dialog: MatDialog) {
        clinicService.getClinicById(1).take(1).subscribe((clinic) => this.clinic = clinic);
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
