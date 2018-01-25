//Ng Core
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

//RXJS
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/delay';

@Component({
    selector: 'new-clinic-form',
    templateUrl: './new-clinic-form.component.html',
    styleUrls: ['./new-clinic-form.component.css']
})
export class NewClinicFormComponent {
    
    newClinicForm: FormGroup;
    
    //Used by the location validator
    locationStatusMessage: string = '';
    
    constructor(private formBuilder: FormBuilder) {
        this.newClinicForm = formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            waitTime: '',
            address: ['', Validators.required, this.locationValidator.bind(this)],
            lat: ['', Validators.required],
            lng: ['', Validators.required]
        });

        setInterval(() => console.log(this.newClinicForm), 5000);
    }
    
    locationValidator(): {[key: string]: any} {
        this.locationStatusMessage = 'Locating...';

        return Observable.timer(500).switchMap(() => {
            return Observable.of(null).delay(Math.random() * 2000);
        }).map(() => {
            if (Math.random() > 0.5) {
                this.locationStatusMessage = 'Found';
                return null;
            } else {
                this.locationStatusMessage = 'Not found';
                return { 'location': { value: 'Could not find location' } };
            }
        });
    }
}
