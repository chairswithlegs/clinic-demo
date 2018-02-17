import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ClinicService } from './app-api/clinic.service';
import { AuthService } from './app-api/auth.service';
import { ClinicLocationService } from './app-api/clinic-location.service';
import { AppMaterialModule } from './app-material/app-material.module';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';

class MockClinicService {
    connectionAlertObservable = Observable.of(null);
}

class MockAuthService {
    connectionAlertObservable = Observable.of(null);
}

class MockClinicLocationService {
    connectionAlertObservable = Observable.of(null);
}

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                AppMaterialModule
            ],
            declarations: [
                AppComponent
            ],
            providers: [
                { provide: ClinicService, useClass: MockClinicService },
                { provide: AuthService, useClass: MockAuthService },
                { provide: ClinicLocationService, useClass: MockClinicLocationService }
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        }).compileComponents();
    }));
    
    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        expect(app).toBeTruthy();
    }));
});
