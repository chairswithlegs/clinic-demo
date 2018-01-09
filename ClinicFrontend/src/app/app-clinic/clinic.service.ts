import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Clinic } from './clinic';

@Injectable()
export class ClinicService {

  clinicsObservable: Observable<Clinic[]>;
  private clinicsSubject: BehaviorSubject<Clinic[]>;

  constructor() {
    this.clinicsSubject = new BehaviorSubject([]);
    this.clinicsObservable = this.clinicsSubject.asObservable();

    this.loadClinics();
   }

  private loadClinics() {
    var clinics: Clinic[] = [{
      name: 'clinic 1',
      address: 'Here',
      id: 1234,
      lat: 43.5,
      lng: -70.4,
      waitTime: 36e5 + 2000
    },{
      name: 'clinic 2',
      address: 'There',
      id: 5678,
      lat: 43.55,
      lng: -70.35,
      waitTime: 35e4
    }];

    this.clinicsSubject.next(clinics);
  }
}
