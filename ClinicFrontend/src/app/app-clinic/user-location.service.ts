//Ng CORE
import { Injectable } from '@angular/core';

//RXJS
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

//TYPES
import { Coords } from '../app-api/coords';


@Injectable()
export class UserLocationService {
	//Cache the user location
	private userLocation: Coords;
	
	constructor() {}
	
	//Returns the user's location as an observable
	getUserLocation(): Observable<Coords> {
		//Check if the user location is cached, otherwise attempt to loaded it
		if (this.userLocation != null) {
			return Observable.of(this.userLocation);
		} else {
			return Observable.create((observer) => {
				if (!!navigator.geolocation) {
					navigator.geolocation.getCurrentPosition((position) => {
						const coords: Coords = {
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
