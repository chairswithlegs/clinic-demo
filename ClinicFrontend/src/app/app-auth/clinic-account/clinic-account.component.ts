import { Component} from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';
import { EditWaitTimeComponent } from '../edit-wait-time/edit-wait-time.component';
import { ClinicService } from '../../app-clinic/clinic.service';
import { Clinic } from '../../app-clinic/clinic';

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