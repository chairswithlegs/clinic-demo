import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { ClinicService } from '../../app-api/clinic.service';
import { ClinicDetailComponent } from './clinic-detail.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core';
import { Clinic } from '../../app-api/clinic';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';

@Pipe({name: 'millisecondsToReadable'})
class MockPipe implements PipeTransform {
    transform(milliseconds: number, smallestUnit: number, largestUnit: number): string {
        return '';
    }
}

class MockClinicService {
    clinicsObservable: Observable<Clinic[]> = new Observable<Clinic[]>();
    
    getClinicById (id) {
        let clinic = new Clinic();
        clinic.id = 1;
        return Observable.of(clinic);
    }
}

class MockActivatedRoute {
    params = Observable.of({ 'clinic-id': 1 })
}

describe('ClinicDetailComponent', () => {
    let component: ClinicDetailComponent;
    let fixture: ComponentFixture<ClinicDetailComponent>;
    let directionsEl: DebugElement;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                ClinicDetailComponent, 
                MockPipe 
            ],
            providers: [
                { provide: ClinicService, useClass: MockClinicService },
                { provide: ActivatedRoute, useClass: MockActivatedRoute }
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        .compileComponents();
    }));
    
    beforeEach(() => {
        fixture = TestBed.createComponent(ClinicDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        directionsEl = fixture.debugElement.query(By.css('#directions'));
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load the correct clinic based on the route', () => {
        expect(component.clinic.id).toBe(1);
    });

    it('should get directions when the user clicks the directions button', () => {
        let spy = spyOn(component, 'getDirections');

        //Mock the user clicking the button
        directionsEl.triggerEventHandler('click', null);

        //Verify that the directions method was called
        expect(spy).toHaveBeenCalled();
    });
});
