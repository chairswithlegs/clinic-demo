import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { GoogleApiKey } from './google-api-key';
import { Coords } from './coords';

@Injectable()
export class LocationService {
    
    constructor(private http: Http) {}

    loadNavigatorLocation(): Observable<Coords> {
        let locationSubject: Subject<Coords> = new Subject();
        
        if (!!navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let coords: {lat: number, lng: number} = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                locationSubject.next(coords);
            }, (error) => {
                locationSubject.error(error);
            });
        } else {
            locationSubject.error('Location is disabled. Please enable on browser to use this feature.');
        }

        return locationSubject.asObservable();
    }
    
    loadAddressLocation(locationString: string): Observable<Coords> {
        return this.sendGoogleQuery(locationString)
        .catch((error) => Observable.of(error))
        .map((response) => {
            response = response.json();
            try { 
                return response = {
                    lat: response['results'][0]['geometry']['location']['lat'],
                    lng: response['results'][0]['geometry']['location']['lng']
                }
            } catch (error) {
                throw new Error(error);
            }
        })
        .catch((error) => Observable.of(error));
    }
    
    private sendGoogleQuery(locationString): Observable<Response> {
        locationString = encodeURI(locationString);
        return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${locationString}&key=${GoogleApiKey}`);
    }
    
}
