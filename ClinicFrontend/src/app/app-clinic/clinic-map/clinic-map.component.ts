import { Component, Input } from '@angular/core';

import { Clinic } from '../clinic';

@Component({
  selector: 'app-clinic-map',
  templateUrl: './clinic-map.component.html',
  styleUrls: ['./clinic-map.component.css']
})
export class ClinicMapComponent {
  @Input() mapStyle = "";
  @Input() clinics: Clinic[];
  @Input() lat: number;
  @Input() lng: number;
}
