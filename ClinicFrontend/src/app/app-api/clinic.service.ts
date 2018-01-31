//CORE
import { Injectable } from '@angular/core';

//RXJS
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//TYPES
import { Coords } from './coords';
import { Clinic } from './clinic';

@Injectable()
export class ClinicService {
    clinicsObservable: Observable<Clinic[]>;
    private clinicsSubject: BehaviorSubject<Clinic[]>;
    
    //testing
    private mockData: Clinic[];
    
    constructor() {
        this.clinicsSubject = new BehaviorSubject([]);
        this.clinicsObservable = this.clinicsSubject.asObservable();
        
        //Mock the api.
        this.mockData = this.generateMockData();
        this.clinicsSubject.next(this.mockData);
    }
    
    //Return a single clinic based on its id
    getClinicById(id: number): Observable<Clinic> {
        return Observable.of(this.clinicsSubject.getValue().find((clinic) => clinic.id == id));
    }
    
    //Returns an array containing all clinics
    getClinics(): Observable<Clinic[]> {
        return this.clinicsObservable;
    }

    deleteClinic(clinicId: number): Observable<boolean> {
        for (let i = 0; i < this.mockData.length; i++) {
            if (this.mockData[i].id == clinicId) {
                this.mockData.splice(i, 1);
            }
        }

        return Observable.of(true).catch((error) => Observable.of(false));
    }

    updateLocation(clinicId: number, address: string, lat: number, lng: number): Observable<boolean> {
        let clinic = this.mockData.find((clinic) => clinic.id == clinicId);
        clinic.address = address;
        clinic.lat = lat;
        clinic.lng = lng;

        return Observable.of(true).catch((error) => Observable.of(false));
    }

    updateClinicProfile(clinicId: number, name: string, description: string): Observable<boolean> {
        let clinic = this.mockData.find((clinic) => clinic.id == clinicId);
        clinic.name = name;
        clinic.description = description;

        return Observable.of(true).catch((error) => Observable.of(false));
    }

    updateWaitTime(clinicId: number, waitTime: number): Observable<boolean> {
        this.mockData.find((clinic) => clinic.id == clinicId).waitTime = waitTime;
        return Observable.of(true).catch((error) => Observable.of(false));
    }

    updateAddress(clinicId: number, address: string, coords: Coords): Observable<boolean> {
        let clinic: Clinic = this.mockData.find((clinic) => clinic.id == clinicId);
        clinic.lat = coords.lat;
        clinic.lng = coords.lng;
        clinic.address = address;

        return Observable.of(true).catch((error) => Observable.of(false));
    }

    updateProfile(clinicId: number, name: string, description: string): Observable<boolean> {
        let clinic: Clinic = this.mockData.find((clinic) => clinic.id == clinicId);
        clinic.name = name;
        clinic.description = description;

        return Observable.of(true).catch((error) => Observable.of(false));
    }
    
    //Create a clinic in the database. Returns a boolean observable that reports if the operation was a success.
    createClinic(clinic: Clinic): Observable<boolean> {
        clinic.id = this.mockData.length + 1;
        this.mockData.push(clinic);
        return Observable.of(true).catch((error) => Observable.of(false));
    }
    
    //Used for mocking api
    private generateMockData(): Clinic[] {
        return [{
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
            id: 7,
            lat: 43.54,
            lng: -70.33,
            waitTime: 35e4,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet lectus nibh. Morbi sed magna nec sapien egestas iaculis. Donec euismod ut tortor pulvinar gravida. Sed aliquam tempor massa, non consequat nibh auctor vel. Morbi non arcu elementum, faucibus eros sed, molestie nunc. Nunc feugiat leo varius sapien bibendum bibendum. Pellentesque tempor lacus semper, bibendum quam at, cursus metus. Curabitur ac egestas lorem.'            
        },{
            name: 'Immediate Care medical walkin of Toms River',
            address: 'MinuteClinic, 890 Bennetts Mills Rd, Jackson, NJ 08527',
            id: 8,
            lat: 43.52,
            lng: -70.42,
            waitTime: 36e5 + 2000,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet lectus nibh. Morbi sed magna nec sapien egestas iaculis. Donec euismod ut tortor pulvinar gravida. Sed aliquam tempor massa, non consequat nibh auctor vel. Morbi non arcu elementum, faucibus eros sed, molestie nunc. Nunc feugiat leo varius sapien bibendum bibendum. Pellentesque tempor lacus semper, bibendum quam at, cursus metus. Curabitur ac egestas lorem.'            
        },{
            name: 'clinic 2',
            address: 'There',
            id: 9,
            lat: 43.56,
            lng: -70.37,
            waitTime: 35e4,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sit amet lectus nibh. Morbi sed magna nec sapien egestas iaculis. Donec euismod ut tortor pulvinar gravida. Sed aliquam tempor massa, non consequat nibh auctor vel. Morbi non arcu elementum, faucibus eros sed, molestie nunc. Nunc feugiat leo varius sapien bibendum bibendum. Pellentesque tempor lacus semper, bibendum quam at, cursus metus. Curabitur ac egestas lorem.'            
        }];
    }
}
