//Ng CORE
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

//RXJS
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

//SERVICES
import { AuthService } from './auth.service';

//TYPES
import { Coords } from './coords';

//CONFIG
import { backendApiUrl } from './config';


@Injectable()
export class ClinicLocationService {
	timeout = 6000;
	
	//Broadcasts connection alerts
	connectionAlertObservable: Observable<any>;
	private connectionAlertSubject: Subject<any>;
	
	constructor(private http: HttpClient, private authService: AuthService) {
		//Initialize connection alert
		this.connectionAlertSubject = new Subject();
		this.connectionAlertObservable = this.connectionAlertSubject.asObservable();
	}
	
	getClinicLocation(address: string): Observable<Coords> {
		//Get the JWT. This will be sent along side the request.
		const headers: HttpHeaders = new HttpHeaders({
			'Authorization': `Bearer ${this.authService.getToken()}`
		});
		
		return this.http.get(`${backendApiUrl}/clinics/address/${encodeURI(address)}`, { headers: headers })
		.timeout(this.timeout)
		.map((response) => {
			return response['results'][0]['geometry']['location'];
		})
		.catch((error) => {
			this.connectionAlertSubject.next(error);
			return Observable.of(null);
		});
	}
}
