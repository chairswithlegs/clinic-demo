import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NewClinicFormComponent } from './new-clinic-form.component';
import { AddressValidator } from '../../app-api/address-validator';
import { ClinicService } from '../../app-api/clinic.service';
import { MatSnackBar } from '@angular/material';


class MockAddressValidator {
    checkAddress(lat, lng) {
        return (formControl) => {
            return Observable.of({});
        }
    }
}

class MockClinicService {
    
}

class MockMatSnackBar {
    open(text1, text2) {
        return;
    }
}

describe('NewClinicFormComponent', () => {
    let component: NewClinicFormComponent;
    let fixture: ComponentFixture<NewClinicFormComponent>;
    
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
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
