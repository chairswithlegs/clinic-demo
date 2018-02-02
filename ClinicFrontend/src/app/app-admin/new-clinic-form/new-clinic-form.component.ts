//Ng Core
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

//Ng MATERIAL
import { MatSnackBar } from '@angular/material';

//RXJS
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/catch';

//SERVICES
import { ClinicLocationService } from '../../app-api/clinic-location.service';
import { ClinicService } from '../../app-api/clinic.service';

//CUSTOM VALIDATORS
import { AddressValidator } from '../../app-api/address-validator';

//TYPES
import { Coords } from '../../app-api/coords';
import { Clinic } from '../../app-api/clinic';

@Component({
    selector: 'new-clinic-form',
    templateUrl: './new-clinic-form.component.html',
    styleUrls: ['./new-clinic-form.component.css'],
    providers: [ClinicLocationService]
})
export class NewClinicFormComponent implements OnInit {
    
    newClinicForm: FormGroup;
    waitTime: { hours: number, minutes: number } = { hours: 0, minutes: 0 };
    formSubmitted: boolean = false;
    
    constructor(private formBuilder: FormBuilder, private clinicService: ClinicService, private snackbar: MatSnackBar, private addressValidator: AddressValidator) {}
    
    ngOnInit() {
        //Instantiate the form
        this.newClinicForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            waitTime: '',
            lat: ['', Validators.required],
            lng: ['', Validators.required]
        });
        
        //Add the address control after since it has a validator that references other controls in the form
        this.newClinicForm.addControl('address', new FormControl('', Validators.required, this.addressValidator.checkAddress(this.newClinicForm.controls.lat, this.newClinicForm.controls.lng)));
    }
    
    onSubmit(form: FormGroup): void {
        if (form.valid == false) {
            console.log('Invalid form');
        } else {
            //
            let clinic: Clinic = new Clinic();
            clinic.name = form.controls.name.value;
            clinic.description = form.controls.description.value;
            clinic.address = form.controls.address.value;
            clinic.lat = form.controls.lat.value;
            clinic.lng = form.controls.lng.value;
            
            //Attempt to create the clinic
            this.clinicService.createClinic(clinic).take(1).subscribe((success) => {
                if (success) {
                    //Momentarily mark the form as submitted
                    this.formSubmitted = true;
                    setTimeout(() => this.formSubmitted = false, 2000);
                    
                    //Reset the form for any additional entries
                    this.resetForm(form);
                } else {
                    this.snackbar.open('An error was encountered. Clinic could not be added.', 'Dismiss')
                }
            });
            
            
        }
        
        console.log(form);
    }
    
    resetForm(form: FormGroup): void {
        //Reset the form values
        form.reset()
        
        //Clear error messages
        for(let control in form.controls) {
            form.controls[control].setErrors(null);
        }
        
        this.waitTime = { hours: 0, minutes: 0 };
    }
}