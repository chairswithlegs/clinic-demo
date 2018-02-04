//Ng CORE
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//RXJS
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/timeout';

//SERVICES
import { AuthService } from './auth.service';

//TYPES
import { Coords } from './coords';
import { Clinic } from './clinic';
import { AuthState } from './auth-state';

//CONFIG
import { backendApiUrl } from './config';


@Injectable()
export class ClinicService {
    timeout: number = 2000;
    
    clinicsObservable: Observable<Clinic[]>;
    private clinicsSubject: BehaviorSubject<Clinic[]>;
    
    constructor(private http: HttpClient, private authService: AuthService) {
        this.clinicsSubject = new BehaviorSubject<Clinic[]>([]);
        this.clinicsObservable = this.clinicsSubject.asObservable();
        this.updateClinicsObservable();
    }
    
    //Return an observable of a single clinic with a specific id 
    getClinicById(id: number): Observable<Clinic> {
        return this.http.get<Clinic>(`${backendApiUrl}/clinics/${id}`)
        .timeout(this.timeout);
    }
    
    //Update clinic information
    updateClinic(clinic: Clinic): Observable<boolean> {
        //Get the JWT. This will be sent along side the request.
        let headers: HttpHeaders = new HttpHeaders({
            'Authorization': `Bearer ${this.authService.getToken()}`
        });
        
        return this.http.put(`${backendApiUrl}/clinics`, clinic, { headers: headers })
        .timeout(this.timeout)
        .map(() => {
            //Notify subscribers of the updated data
            this.updateClinicsObservable();
            //Default to a successful response...
            return true
        })
        //...Set to false if an error (timeout or bad status code) is returned
        .catch(() => Observable.of(false));
    }
    
    //Deletes a clinic in the database. Returns a boolean observable that report if the operation was a success.
    deleteClinic(clinicId: number): Observable<boolean> {
        //Get the JWT. This will be sent along side the request.
        let headers: HttpHeaders = new HttpHeaders({
            'Authorization': `Bearer ${this.authService.getToken()}`
        });
        
        //Fire off the request and map the response to a boolean.
        return this.http.delete(`${backendApiUrl}/clinics/${clinicId}`, { headers: headers })
        .timeout(this.timeout)
        .map(() => {
            //Notify subscribers of the updated data
            this.updateClinicsObservable();
            
            //Default to a successful response...
            return true
        })
        //...Set to false if an error (timeout or bad status code) is returned
        .catch(() => Observable.of(false));
    }
    
    //Create a clinic in the database. Returns a boolean observable that reports if the operation was a success.
    createClinic(clinic: Clinic): Observable<boolean> {
        //Get the JWT. This will be sent along side the request.
        let headers: HttpHeaders = new HttpHeaders({
            'Authorization': `Bearer ${this.authService.getToken()}`
        });
        
        //Fire off the request and map the response to a boolean.
        return this.http.post(`${backendApiUrl}/clinics`, clinic, { headers: headers })
        .timeout(this.timeout)
        .map(() => {
            //Notify subscribers of the updated data
            this.updateClinicsObservable();
            
            //Default to a successful response...
            return true
        })
        //...Set to false if an error (timeout or bad status code) is returned
        .catch(() => Observable.of(false));
    }
    
    //Update the clinic observable
    private updateClinicsObservable(): void {
        this.http.get<Clinic[]>(`${backendApiUrl}/clinics`)
        .timeout(this.timeout)
        .take(1)
        .subscribe((clinics) => this.clinicsSubject.next(clinics));
    }
}
