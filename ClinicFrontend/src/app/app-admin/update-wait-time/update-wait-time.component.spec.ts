import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { UpdateWaitTimeComponent } from './update-wait-time.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

class MockMatDialogRef {
    open = () => {}
    close = () => {}
}

describe('UpdateWaitTimeComponent', () => {
    let component: UpdateWaitTimeComponent;
    let fixture: ComponentFixture<UpdateWaitTimeComponent>;
    
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ UpdateWaitTimeComponent ],
            providers: [ 
                { provide: MatDialogRef, useClass: MockMatDialogRef }
            ],
            schemas: [ NO_ERRORS_SCHEMA ]
        })
        .compileComponents();
    }));
    
    beforeEach(() => {
        fixture = TestBed.createComponent(UpdateWaitTimeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
