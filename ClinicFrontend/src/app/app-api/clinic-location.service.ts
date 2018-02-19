//Ng CORE
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//RXJS
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

//TYPES
import { Coords } from './coords';

//CONFIG
import { googleApiKey } from './config';


@Injectable()
export class ClinicLocationService {
	timeout = 2000;
	
	//Broadcasts connection alerts
	connectionAlertObservable: Observable<any>;
	private connectionAlertSubject: Subject<any>;
	
	constructor(private http: HttpClient) {
		//Initialize connection alert
		this.connectionAlertSubject = new Subject();
		this.connectionAlertObservable = this.connectionAlertSubject.asObservable();
	}
	
	getClinicLocation(address: string): Observable<Coords> {
		return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${googleApiKey}`)
		.timeout(2000)
		.map((response) => {
			return response['results'][0]['geometry']['location'];
		})
		.catch((error) => {
			this.connectionAlertSubject.next(error);
			return Observable.of(null);
		});
	}
}
