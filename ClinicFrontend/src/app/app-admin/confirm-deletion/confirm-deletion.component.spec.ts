import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { ConfirmDeletionComponent } from './confirm-deletion.component';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';

class MockMatDialogRef {
	close = () => {}
}

describe('ConfirmDeletionComponent', () => {
	let component: ConfirmDeletionComponent;
	let fixture: ComponentFixture<ConfirmDeletionComponent>;
	let deleteEl: DebugElement;
	let cancelEl: DebugElement;
	let dialogRef: MockMatDialogRef;
	
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ ConfirmDeletionComponent ],
			providers: [
				{ provide: MatDialogRef, useClass: MockMatDialogRef }
			]
		})
		.compileComponents();
	}));
	
	beforeEach(() => {
		fixture = TestBed.createComponent(ConfirmDeletionComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		
		deleteEl = fixture.debugElement.query(By.css('#delete'));
		cancelEl = fixture.debugElement.query(By.css('#cancel'));

		dialogRef = TestBed.get(MatDialogRef);
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
	
	it('should click delete button and close a dialog with an argument value of true', () => {
		let spy = spyOn(dialogRef, 'close');
		deleteEl.triggerEventHandler('click', null);
		expect(spy).toHaveBeenCalledWith(true);
	});

	it('should click cancel button and close a dialog', () => {
		let spy = spyOn(dialogRef, 'close');
		cancelEl.triggerEventHandler('click', null);
		expect(spy).toHaveBeenCalled();
	});
});
