//Ng CORE
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

//RXJS
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//TYPES
import { Coords } from './coords';

//CONFIG
import { googleApiKey } from './config';


@Injectable()
export class ClinicLocationService {

  constructor(private http: Http) { }

  getClinicLocation(address: string): Observable<Coords> {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${googleApiKey}`)
    .map((response) => {
        response = response.json();
        return response['results'][0]['geometry']['location'];
    });
  }
}
