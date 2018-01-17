import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
import { Coords } from './coords';

@Injectable()
export class LocationService {
    constructor(private http: Http) {}

    //Returns the user's location as an observable
    getUserLocation(): Observable<Coords> {
        return Observable.create((observer) => {
            if (!!navigator.geolocation) {
                navigator.geolocation.getCurrentPosition((position) => {
                    let coords: {lat: number, lng: number} = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
    
                    observer.next(coords);
                }, (error) => {
                    observer.error(error);
                });
            } else {
                observer.error('Location is disabled. Please enable on browser to use this feature.');
            }
        });
    }
}
