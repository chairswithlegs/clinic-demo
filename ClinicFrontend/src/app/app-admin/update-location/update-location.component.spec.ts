import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateLocationComponent } from './update-location.component';
import { Clinic } from '../../app-api/clinic';
import { AddressValidator } from '../../app-api/address-validator';
import { Observable } from 'rxjs/Observable';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockMatDialogRef {
    open = () => {}
    close = () => {}
}

class MockAddressValidator {
    checkAddress(lat, lng) {
        return (formControl) => {
            return Observable.of({});
        }
    }
}

describe('UpdateLocationComponent', () => {
    let component: UpdateLocationComponent;
    let fixture: ComponentFixture<UpdateLocationComponent>;
    
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
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
