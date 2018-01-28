//Ng Core
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Http } from '@angular/http';

//Ng MATERIAL
import { MatSnackBar } from '@angular/material';

//RXJS
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/catch';

//SERVICES
import { ClinicLocationService } from '../../app-api/clinic-location.service';

//TYPES
import { Coords } from '../../app-api/coords';

@Component({
    selector: 'new-clinic-form',
    templateUrl: './new-clinic-form.component.html',
    styleUrls: ['./new-clinic-form.component.css'],
    providers: [ClinicLocationService]
})
export class NewClinicFormComponent {
    
    newClinicForm: FormGroup;
    waitTimeDisplay: { hours: number, minutes: number } = { hours: 0, minutes: 0 };
    formSubmitted: boolean = false;
    
    constructor(private formBuilder: FormBuilder, private http: Http, private ClinicLocationService: ClinicLocationService, private snackbar: MatSnackBar) {
        this.createForm();
    }
    
    locationValidator(addressControl: FormControl): {[key: string]: any} {
        this.newClinicForm.controls.lat.setValue(null);
        this.newClinicForm.controls.lng.setValue(null);
        
        return Observable.timer(500).switchMap(() => {
            return this.ClinicLocationService.getClinicLocation(addressControl.value);
        })
        .map((coords) => {
            this.newClinicForm.controls.lat.setValue(coords.lat);
            this.newClinicForm.controls.lng.setValue(coords.lng);
        })
        .catch((error) => {
            return Observable.of({ 'location': { value: 'Could not find location' } });
        });
    }
    
    onSubmit(form: FormGroup) {
        if (form.valid == false) {
            console.log('Invalid form');
        } else {
            this.resetForm(form);
            this.formSubmitted = true;
            setTimeout(() => this.formSubmitted = false, 2000);
        }
        
        console.log(form);
    }
    
    resetForm(form: FormGroup) {
        //Reset the form values
        form.reset()
        
        //Clear error messages
        for(let control in form.controls) {
            form.controls[control].setErrors(null);
        }
        
        this.waitTimeDisplay = { hours: 0, minutes: 0 };
    }

    private createForm() {
        this.newClinicForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            waitTime: '',
            address: ['', Validators.required, this.locationValidator.bind(this)],
            lat: ['', Validators.required],
            lng: ['', Validators.required]
        });
    }
}
