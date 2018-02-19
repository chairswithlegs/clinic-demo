import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { UpdateWaitTimeComponent } from './update-wait-time.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';

class MockMatDialogRef {
	waitTime: number;
	
	close(waitTime) {
		this.waitTime = waitTime;
	}
}

describe('UpdateWaitTimeComponent', () => {
	let component: UpdateWaitTimeComponent;
	let fixture: ComponentFixture<UpdateWaitTimeComponent>;
	let dialog: MockMatDialogRef;
	let saveEl: DebugElement;
	let cancelEl: DebugElement;
	let hoursEl: DebugElement;
	let minutesEl: DebugElement;
	
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
		
		dialog = TestBed.get(MatDialogRef);
		saveEl = fixture.debugElement.query(By.css('#save'));
		cancelEl = fixture.debugElement.query(By.css('#cancel'));
		hoursEl = fixture.debugElement.query(By.css('#hours'));
		minutesEl = fixture.debugElement.query(By.css('#minutes'));
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
	
	it('should close the dialog and return the new clinic information when user clicks save', () => {
		const hours = 1;
		const minutes = 1;
		
		//Sanity checks
		expect(saveEl).toBeTruthy();
		expect(hoursEl).toBeTruthy();
		expect(minutesEl).toBeTruthy();
		
		//Set the slider value
		hoursEl.nativeElement.value = hours;
		minutesEl.nativeElement.value = minutes;
		fixture.detectChanges();
		
		//Mock the user clicking save
		saveEl.triggerEventHandler('click', null);
		fixture.detectChanges();
		
		//Verify that the value were updated in the mock service
		expect(dialog.waitTime).toBe((hours * 3.6e6) + (minutes * 6e4)); //Convert dummy data to milliseconds
	});
	
	it('should close with no return value when user clicks cancel', () => {
		const spy = spyOn(dialog, 'close');
		
		//Mock the user clicking cancel
		cancelEl.triggerEventHandler('click', null);
		fixture.detectChanges();
		
		//Verify that the dialog has been close with no return value
		expect(spy).toHaveBeenCalledWith();
	});
});
