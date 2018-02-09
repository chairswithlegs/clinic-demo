import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms'
import { LoginComponent } from './login.component';
import { AuthService } from '../../app-api/auth.service';
import { MatSnackBar } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockAuthService {
    
}

class MockMatSnackBar {
    
}

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ 
                ReactiveFormsModule,
                RouterTestingModule
            ],
            declarations: [ LoginComponent ],
            providers: [
                { provide: AuthService, useClass: MockAuthService },
                { provide: MatSnackBar, useClass: MockMatSnackBar }
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
        .compileComponents();
    }));
    
    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
