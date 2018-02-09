import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClinicService } from '../../app-api/clinic.service';
import { UpdateClinicMenuComponent } from './update-clinic-menu.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from '../../app-material/app-material.module';

class MockClinicService {
    
}

class MockMatDialog {
    
}

class MockMatSnackBar {
    
}

describe('UpdateClinicMenuComponent', () => {
    let component: UpdateClinicMenuComponent;
    let fixture: ComponentFixture<UpdateClinicMenuComponent>;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ AppMaterialModule ],
            declarations: [ UpdateClinicMenuComponent ],
            providers: [
                { provide: ClinicService, useClass: MockClinicService },
                { provide: MatDialog, useClass: MockMatDialog },
                { provide: MatSnackBar, useClass: MockMatSnackBar }
            ]
        })
        .compileComponents();
    }));
    
    beforeEach(() => {
        fixture = TestBed.createComponent(UpdateClinicMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
