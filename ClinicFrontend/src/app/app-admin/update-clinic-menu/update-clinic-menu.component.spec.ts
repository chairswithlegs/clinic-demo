import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ClinicService } from '../../app-api/clinic.service';
import { UpdateClinicMenuComponent } from './update-clinic-menu.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppMaterialModule } from '../../app-material/app-material.module';
import { Observable } from 'rxjs/Observable';
import { Clinic } from '../../app-api/clinic';

class MockClinicService {
	deleteClinic() {
		return Observable.of(false);
	}
}

class MockMatDialog {
	returnValue: any = null;
	called = 0;
	open() {
		return {
			afterClosed: () => {
				this.called++;
				return Observable.of(this.returnValue);
			}
		};
	}
}

class MockMatSnackBar {
	open () {}
}

describe('UpdateClinicMenuComponent', () => {
	let component: UpdateClinicMenuComponent;
	let fixture: ComponentFixture<UpdateClinicMenuComponent>;
	let snackbar: MockMatSnackBar;
	let dialog: MockMatDialog;
	
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
		
		snackbar = TestBed.get(MatSnackBar);
		dialog = TestBed.get(MatDialog);
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});
	
	it('should open a dialog when updating clinic information', async() => {
		component.confirmDeletion(null);
		component.updateClinicProfile(null);
		component.updateLocation(null);
		component.updateWaitTime(null);
		
		fixture.whenStable();
		
		expect(dialog.called).toBe(4);
	});
	
	it('should alert user if update failed', async() => {
		const spy = spyOn(snackbar, 'open');
		
		//Set the return value (for testing purposes) - simulates the user cancelling the dialog
		dialog.returnValue = false;
		
		//Trigger an update function
		component.confirmDeletion(null);
		fixture.whenStable();
		
		//Verify that the snackbar was not called (since user cancelled)
		expect(spy).not.toHaveBeenCalled();
		
		//Now try confirming the deletion
		dialog.returnValue = true;
		
		component.confirmDeletion(new Clinic());
		fixture.whenStable();
		
		//Verify that the snackbar was called
		expect(spy).toHaveBeenCalled();
	});
});
