import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateClinicProfileComponent } from './update-clinic-profile.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Clinic } from '../../app-api/clinic';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';

class MockMatDialogRef {
	name: string;
	description: string;
	
	close(profile) {
		this.name = profile.name;
		this.description = profile.description;
	}
}

describe('UpdateClinicProfileComponent', () => {
	let component: UpdateClinicProfileComponent;
	let fixture: ComponentFixture<UpdateClinicProfileComponent>;
	let dialog: MockMatDialogRef;
	let saveEl: DebugElement;
	let cancelEl: DebugElement;
	
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ UpdateClinicProfileComponent ],
			providers: [
				{ provide: MatDialogRef, useClass: MockMatDialogRef },
				{ provide: MAT_DIALOG_DATA, useValue: new Clinic()}
			],
			schemas: [ NO_ERRORS_SCHEMA ]
		})
		.compileComponents();
	}));
	
	beforeEach(() => {
		fixture = TestBed.createComponent(UpdateClinicProfileComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		
		dialog = TestBed.get(MatDialogRef);
		saveEl = fixture.debugElement.query(By.css('#save'));
		cancelEl = fixture.debugElement.query(By.css('#cancel'));
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
	
	it('should close the dialog and return the new clinic information when user clicks save', () => {
		const name = 'test name';
		const description = 'test description';
		
		//Add the dummy content
		component.name = name;
		component.description = description;
		fixture.detectChanges();
		
		//Sanity check
		expect(saveEl).toBeTruthy();
		
		//Mock the user clicking save
		saveEl.triggerEventHandler('click', null);
		fixture.detectChanges();
		
		//Verify that the value were updated in the mock service
		expect(dialog.name).toBe(name);
		expect(dialog.description).toBe(description);
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
