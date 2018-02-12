import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateLocationComponent } from './update-location.component';
import { Clinic } from '../../app-api/clinic';
import { AddressValidator } from '../../app-api/address-validator';
import { Observable } from 'rxjs/Observable';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';

class MockMatDialogRef {
    address: string;
    lat: number;
    lng: number;

    close(location) {
        this.address = location.address;
        this.lat = location.lat;
        this.lng = location.lng;
    }
}

class MockAddressValidator {
    checkAddress(lat, lng) {
        return (formControl) => {
            return Observable.of(null);
        }
    }
}

describe('UpdateLocationComponent', () => {
    let component: UpdateLocationComponent;
    let fixture: ComponentFixture<UpdateLocationComponent>;
    let dialog: MockMatDialogRef;
	let formEL: DebugElement;
	let cancelEl: DebugElement;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ ReactiveFormsModule ],
            declarations: [ UpdateLocationComponent ],
            providers: [
                { provide: MatDialogRef, useClass: MockMatDialogRef },
                { provide: MAT_DIALOG_DATA, useValue: new Clinic() },
                { provide: AddressValidator, useClass: MockAddressValidator }
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        .compileComponents();
    }));
    
    beforeEach(() => {
        fixture = TestBed.createComponent(UpdateLocationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        dialog = TestBed.get(MatDialogRef);
		formEL = fixture.debugElement.query(By.css('form'));
		cancelEl = fixture.debugElement.query(By.css('#cancel'));
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should close the dialog and return the new clinic information when user clicks save', async() => {
        let address = 'USA';
        let lat = 0;
        let lng = 0;
        
        //Add the dummy form content
        component.addressForm.controls.address.setValue(address);
        component.addressForm.controls.lat.setValue(lat);
        component.addressForm.controls.lng.setValue(lng);
        fixture.detectChanges();
        fixture.whenStable();

        //Sanity checks
        expect(component.addressForm.valid).toBe(true);
        expect(formEL).toBeTruthy();
        

		//Mock the user clicking save
		formEL.triggerEventHandler('ngSubmit', null);
		fixture.detectChanges();

		//Verify that the value were updated in the mock service
        expect(dialog.address).toBe(address);
        expect(dialog.lat).toBe(lat);
        expect(dialog.lng).toBe(lng);
	});

	it('should close with no return value when user clicks cancel', () => {
		let spy = spyOn(dialog, 'close');

		//Mock the user clicking cancel
		cancelEl.triggerEventHandler('click', null);
		fixture.detectChanges();

		//Verify that the dialog has been close with no return value
		expect(spy).toHaveBeenCalledWith();
	});
});
