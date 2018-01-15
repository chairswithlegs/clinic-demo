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

    getClinic(id: number): Clinic {
        return this.clinicsSubject.getValue().find((clinic) => clinic.id == id);
    }
    
    private loadClinics(): void {
        var clinics: Clinic[] = [{
            name: 'Immediate Care medical walkin of Toms River',
            address: 'MinuteClinic, 890 Bennetts Mills Rd, Jackson, NJ 08527',
            id: 1,
            lat: 43.5,
            lng: -70.4,
            waitTime: 36e5 + 2000,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet lectus nibh. Morbi sed magna nec sapien egestas iaculis. Donec euismod ut tortor pulvinar gravida. Sed aliquam tempor massa, non consequat nibh auctor vel. Morbi non arcu elementum, faucibus eros sed, molestie nunc. Nunc feugiat leo varius sapien bibendum bibendum. Pellentesque tempor lacus semper, bibendum quam at, cursus metus. Curabitur ac egestas lorem.'
        },{
            name: 'clinic 2',
            address: 'There',
            id: 2,
            lat: 43.55,
            lng: -70.35,
            waitTime: 35e4,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet lectus nibh. Morbi sed magna nec sapien egestas iaculis. Donec euismod ut tortor pulvinar gravida. Sed aliquam tempor massa, non consequat nibh auctor vel. Morbi non arcu elementum, faucibus eros sed, molestie nunc. Nunc feugiat leo varius sapien bibendum bibendum. Pellentesque tempor lacus semper, bibendum quam at, cursus metus. Curabitur ac egestas lorem.'            
        },{
            name: 'Immediate Care medical walkin of Toms River',
            address: 'MinuteClinic, 890 Bennetts Mills Rd, Jackson, NJ 08527',
            id: 3,
            lat: 43.4,
            lng: -70.41,
            waitTime: 36e5 + 2000,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet lectus nibh. Morbi sed magna nec sapien egestas iaculis. Donec euismod ut tortor pulvinar gravida. Sed aliquam tempor massa, non consequat nibh auctor vel. Morbi non arcu elementum, faucibus eros sed, molestie nunc. Nunc feugiat leo varius sapien bibendum bibendum. Pellentesque tempor lacus semper, bibendum quam at, cursus metus. Curabitur ac egestas lorem.'          
        },{
            name: 'clinic 2',
            address: 'There',
            id: 4,
            lat: 43.54,
            lng: -70.33,
            waitTime: 35e4,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet lectus nibh. Morbi sed magna nec sapien egestas iaculis. Donec euismod ut tortor pulvinar gravida. Sed aliquam tempor massa, non consequat nibh auctor vel. Morbi non arcu elementum, faucibus eros sed, molestie nunc. Nunc feugiat leo varius sapien bibendum bibendum. Pellentesque tempor lacus semper, bibendum quam at, cursus metus. Curabitur ac egestas lorem.'            
        },{
            name: 'Immediate Care medical walkin of Toms River',
            address: 'MinuteClinic, 890 Bennetts Mills Rd, Jackson, NJ 08527',
            id: 5,
            lat: 43.52,
            lng: -70.42,
            waitTime: 36e5 + 2000,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet lectus nibh. Morbi sed magna nec sapien egestas iaculis. Donec euismod ut tortor pulvinar gravida. Sed aliquam tempor massa, non consequat nibh auctor vel. Morbi non arcu elementum, faucibus eros sed, molestie nunc. Nunc feugiat leo varius sapien bibendum bibendum. Pellentesque tempor lacus semper, bibendum quam at, cursus metus. Curabitur ac egestas lorem.'            
        },{
            name: 'clinic 2',
            address: 'There',
            id: 6,
            lat: 43.56,
            lng: -70.37,
            waitTime: 35e4,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet lectus nibh. Morbi sed magna nec sapien egestas iaculis. Donec euismod ut tortor pulvinar gravida. Sed aliquam tempor massa, non consequat nibh auctor vel. Morbi non arcu elementum, faucibus eros sed, molestie nunc. Nunc feugiat leo varius sapien bibendum bibendum. Pellentesque tempor lacus semper, bibendum quam at, cursus metus. Curabitur ac egestas lorem.'            
        },{
            name: 'clinic 2',
            address: 'There',
            id: 4,
            lat: 43.54,
            lng: -70.33,
            waitTime: 35e4,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet lectus nibh. Morbi sed magna nec sapien egestas iaculis. Donec euismod ut tortor pulvinar gravida. Sed aliquam tempor massa, non consequat nibh auctor vel. Morbi non arcu elementum, faucibus eros sed, molestie nunc. Nunc feugiat leo varius sapien bibendum bibendum. Pellentesque tempor lacus semper, bibendum quam at, cursus metus. Curabitur ac egestas lorem.'            
        },{
            name: 'Immediate Care medical walkin of Toms River',
            address: 'MinuteClinic, 890 Bennetts Mills Rd, Jackson, NJ 08527',
            id: 5,
            lat: 43.52,
            lng: -70.42,
            waitTime: 36e5 + 2000,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet lectus nibh. Morbi sed magna nec sapien egestas iaculis. Donec euismod ut tortor pulvinar gravida. Sed aliquam tempor massa, non consequat nibh auctor vel. Morbi non arcu elementum, faucibus eros sed, molestie nunc. Nunc feugiat leo varius sapien bibendum bibendum. Pellentesque tempor lacus semper, bibendum quam at, cursus metus. Curabitur ac egestas lorem.'            
        },{
            name: 'clinic 2',
            address: 'There',
            id: 6,
            lat: 43.56,
            lng: -70.37,
            waitTime: 35e4,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet lectus nibh. Morbi sed magna nec sapien egestas iaculis. Donec euismod ut tortor pulvinar gravida. Sed aliquam tempor massa, non consequat nibh auctor vel. Morbi non arcu elementum, faucibus eros sed, molestie nunc. Nunc feugiat leo varius sapien bibendum bibendum. Pellentesque tempor lacus semper, bibendum quam at, cursus metus. Curabitur ac egestas lorem.'            
        }];
        
        this.clinicsSubject.next(clinics);
    }
}
