//Ng CORE
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'

//RXJS
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//TYPES
import { Coords } from '../app-api/coords';


@Injectable()
export class LocationService {
    //Cache the user location
    private userLocation: Coords;

    constructor(private http: Http) {}

    //Returns the user's location as an observable
    getUserLocation(): Observable<Coords> {
        //Check if the user location is cached, otherwise attempt to loaded it
        if (this.userLocation != null) {
            return Observable.of(this.userLocation);
        }
        else {
            return Observable.create((observer) => {
                if (!!navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition((position) => {
                        let coords: Coords = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };
                        this.userLocation = coords;
                        observer.next(coords);
                    }, (error) => {
                        //Throw an observable error if navigator fails
                        observer.error(error);
                    });
                } else {
                    //Throw an observable error if navigator is inaccessible
                    observer.error('Location is disabled. Please enable on browser to use this feature.');
                }
            });
        }
    }
}
