import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NewClinicFormComponent } from './new-clinic-form.component';
import { AddressValidator } from '../../app-api/address-validator';
import { ClinicService } from '../../app-api/clinic.service';
import { MatSnackBar } from '@angular/material';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';

class MockAddressValidator {
    checkAddress(lat, lng) {
        return (formControl) => {
            return Observable.of(null);
        }
    }
}

class MockClinicService {
    clinicCreated: boolean = false;

    createClinic(clinic): Observable<boolean> {
        if (clinic.name == 'valid clinic') {
            this.clinicCreated = true;
            return Observable.of(true);
        } else {
            return Observable.of(false);
        }
    }
}

class MockMatSnackBar {
    open = () => {}
}

describe('NewClinicFormComponent', () => {
    let component: NewClinicFormComponent;
    let fixture: ComponentFixture<NewClinicFormComponent>;
    let formEl: DebugElement;
    let resetEl: DebugElement;
    
    let clinicService: MockClinicService;
    let snackBar: MockMatSnackBar;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ ReactiveFormsModule ],
            declarations: [ NewClinicFormComponent ],
            providers: [
                { provide: AddressValidator, useClass: MockAddressValidator },
                { provide: ClinicService, useClass: MockClinicService },
                { provide: MatSnackBar, useClass: MockMatSnackBar }
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        .compileComponents();
    }));
    
    beforeEach(() => {
        fixture = TestBed.createComponent(NewClinicFormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        
        formEl = fixture.debugElement.query(By.css('form'));
        resetEl = fixture.debugElement.query(By.css('#reset'));
        clinicService = TestBed.get(ClinicService);
        snackBar = TestBed.get(MatSnackBar);
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
    
    it('should submit the form when valid', async() => {
        let spy = spyOn(component, 'onSubmit');
        
        //Expect the form to be invalid
        expect(component.newClinicForm.invalid).toBe(true);

        //Set the form values
        let controls = component.newClinicForm.controls;
        controls.name.setValue('valid clinic');
        controls.description.setValue('test description');
        controls.lat.setValue(0);
        controls.lng.setValue(0);
        controls.address.setValue('USA');
        fixture.detectChanges();

        //Expect the form to be valid
        expect(component.newClinicForm.valid).toBe(true);

        //Simulate clicking the form submission
        formEl.triggerEventHandler('ngSubmit', null);

        fixture.detectChanges();
        fixture.whenStable();

        //Verify the submission callback was triggered
        expect(spy).toHaveBeenCalledWith(component.newClinicForm);
    });

    it('should reset the form', () => {
        //Quick sanity check
        expect(resetEl).toBeTruthy();

        //Add dummy content to the form
        component.newClinicForm.controls.name.setValue('dummy name');

        //Pre-reset check
        expect(component.newClinicForm.controls.name.value).toEqual('dummy name');

        //Simulate clicking the reset button
        resetEl.triggerEventHandler('click', null);
        fixture.detectChanges();

        expect(component.newClinicForm.controls.name.value).toEqual(null);
    });

    it('should send form data to the clinic service for clinic creation', () => {
        //Sanity check
        expect(clinicService.clinicCreated).toBe(false);
        
        //Set the form values
        let controls = component.newClinicForm.controls;
        controls.name.setValue('valid clinic');
        controls.description.setValue('test description');
        controls.lat.setValue(0);
        controls.lng.setValue(0);
        controls.address.setValue('USA');
        fixture.detectChanges();

        //Simulate clicking the form submission
        formEl.triggerEventHandler('ngSubmit', null);

        fixture.detectChanges();
        fixture.whenStable();
        
        //Quick sanity check to verify form is valid
        expect(component.newClinicForm.valid).toBe(true);

        //Verify the service method was called
        expect(clinicService.clinicCreated).toBe(true);
    });

    it('should alert the user with a snackbar if the clinic can not be created', () => {
        let spy = spyOn(snackBar, 'open');

        //Set the form values
        let controls = component.newClinicForm.controls;
        controls.name.setValue('invalid clinic'); //Note the clinic name (see mock service)
        controls.description.setValue('test description');
        controls.lat.setValue(0);
        controls.lng.setValue(0);
        controls.address.setValue('USA');
        fixture.detectChanges();

        //Simulate clicking the form submission
        formEl.triggerEventHandler('ngSubmit', null);

        fixture.detectChanges();
        fixture.whenStable();

        //Verify snackbar was called
        expect(spy).toHaveBeenCalled();
    });
});
