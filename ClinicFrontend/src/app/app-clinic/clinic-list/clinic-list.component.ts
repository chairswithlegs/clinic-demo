import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ClinicService } from '../clinic.service';
import { Clinic } from '../clinic';

@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.css']
})
export class ClinicListComponent {
  
  clinics: Observable<Clinic[]>;

  constructor(private clinicService: ClinicService) {
    this.clinics = this.clinicService.clinicsObservable;
  }
}
