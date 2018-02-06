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
        imports: [ AgmCoreModule.forRoot({
            //Enter your own Google maps API key here. Key restrictions can be set from the Google API console.
            apiKey: 'AIzaSyBRcFE97OLC21OobG230jnhpYhNCr-gLMI'
          }),
          RouterTestingModule.withRoutes([]) ],
        declarations: [ ClinicMapComponent ],
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

  it('clicking a clinic marker should emit a clinic', async() => {
    expect(false).toBe(true);
  });
});
