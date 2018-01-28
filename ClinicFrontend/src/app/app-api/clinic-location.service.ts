//Ng CORE
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

//RXJS
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//TYPES
import { Coords } from './coords';


@Injectable()
export class ClinicLocationService {

  apiKey = 'AIzaSyBRcFE97OLC21OobG230jnhpYhNCr-gLMI';

  constructor(private http: Http) { }

  getClinicLocation(address: string): Observable<Coords> {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${this.apiKey}`)
    .map((response) => {
        response = response.json();
        return response['results'][0]['geometry']['location'];
    });
  }
}
