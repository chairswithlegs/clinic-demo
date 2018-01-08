import { Component, OnInit } from '@angular/core';

import { Clinic } from '../clinic';

@Component({
  selector: 'app-clinic-list',
  templateUrl: './clinic-list.component.html',
  styleUrls: ['./clinic-list.component.css']
})
export class ClinicListComponent implements OnInit {

  clinics: Clinic[] = [
    { name: 'Clinic 1', address: '123 Lane', id: 1 },
    { name: 'Clinic 2', address: '456 Ave.', id: 2}
  ]

  constructor() { }

  ngOnInit() {
  }

}
