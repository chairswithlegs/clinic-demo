import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClinicListComponent } from './clinic-list.component';
import { Observable } from 'rxjs/Observable';
import { TimeModule } from '../../time/time.module';
import { ClinicService } from '../../app-api/clinic.service';
import { Clinic } from '../../app-api/clinic';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'millisecondsToReadable'})
class MockPipe implements PipeTransform {
    transform(milliseconds: number, smallestUnit: number, largestUnit: number): string {
        return '';
    }
}

class MockClinicService {
    clinicsObservable: Observable<Clinic[]> = Observable.of([new Clinic()]);
}

describe('ClinicListComponent', () => {
    let component: ClinicListComponent;
    let fixture: ComponentFixture<ClinicListComponent>;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([])
            ],
            providers: [ 
                { provide: ClinicService, useClass: MockClinicService }
            ],
            declarations: [
                ClinicListComponent,
                MockPipe
            ],
            schemas: [NO_ERRORS_SCHEMA]
        })
        .compileComponents();
    }));
    
    beforeEach(() => {
        fixture = TestBed.createComponent(ClinicListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
