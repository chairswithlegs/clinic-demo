import { AgmCoreModule } from '@agm/core';
import { RouterTestingModule } from '@angular/router/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicMapComponent } from './clinic-map.component';

import { Clinic } from '../../app-api/clinic';
import { DebugElement } from '@angular/core/src/debug/debug_node';

import { By } from '@angular/platform-browser';
import { UserLocationService } from '../user-location.service';
import { Observable } from 'rxjs/Observable';

let ActivatedRoute: any;

class MockUserLocation {
	getUserLocation() {
		return Observable.of({ lat: 0, lng: 0 });
	}
}

describe('ClinicMapComponent', () => {
	let component: ClinicMapComponent;
	let fixture: ComponentFixture<ClinicMapComponent>;
	
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				AgmCoreModule.forRoot({}),
				RouterTestingModule.withRoutes([])
			],
			declarations: [
				ClinicMapComponent
			],
			providers: [ 
				{ provide: UserLocationService, useClass: MockUserLocation }
			]
		})
		.compileComponents();
	}));
	
	beforeEach(() => {
		fixture = TestBed.createComponent(ClinicMapComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});
	
	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit a clinic when a marker is clicked', async() => {
		let clinic = new Clinic();
		clinic.id = 1;

		//Fill the component with a mock clinic
		component.clinics = [clinic];
		
		fixture.detectChanges();

		//Subscribe to the click event
		component.clinicClick.take(1).subscribe((clinic) => {
			expect(clinic.id).toBe(1);
		});

		//Mock clicking the clinic
		let clinicMarker = fixture.debugElement.query(By.css('agm-marker'));
		clinicMarker.triggerEventHandler('markerClick', null);
	});
});
