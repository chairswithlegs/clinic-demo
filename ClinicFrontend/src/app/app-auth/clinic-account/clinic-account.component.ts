//Ng CORE
import { Component} from '@angular/core';

//Ng MATERIAL
import { MatDialog } from '@angular/material';

//RXJS
import { Observable } from 'rxjs/Observable';

//COMPONENTS AND DIRECTIVES
import { EditWaitTimeComponent } from '../edit-wait-time/edit-wait-time.component';

//SERVICES
import { ClinicService } from '../../app-api/clinic.service';
import { AuthService } from '../../app-api/auth.service';

//TYPES
import { Clinic } from '../../app-api/clinic';


@Component({
  selector: 'app-clinic-account',
  templateUrl: './clinic-account.component.html',
  styleUrls: ['./clinic-account.component.css']
})
export class ClinicAccountComponent {
  clinic: Clinic;

  constructor(private authService: AuthService, private clinicService: ClinicService, private dialog: MatDialog) {
    clinicService.getClinicById(1).take(1).subscribe((clinic) => this.clinic = clinic);
  }

  editWaitTime() {
    this.dialog.open(EditWaitTimeComponent);
  }
}