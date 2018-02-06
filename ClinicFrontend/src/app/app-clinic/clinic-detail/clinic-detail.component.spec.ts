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


@Pipe({name: 'millisecondsToReadable'})
class MockPipe implements PipeTransform {
    transform(milliseconds: number, smallestUnit: number, largestUnit: number): string {
        return '';
    }
}

class MockClinicService {
    clinicsObservable: Observable<Clinic[]> = new Observable<Clinic[]>();
    
    getClinicById = function (id: number) {
        return Observable.of(new Clinic());
    }
}

class MockActivatedRoute {
    params = Observable.of({ 'clinic-id': 1 })
}

describe('ClinicDetailComponent', () => {
    let component: ClinicDetailComponent;
    let fixture: ComponentFixture<ClinicDetailComponent>;
    
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
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
