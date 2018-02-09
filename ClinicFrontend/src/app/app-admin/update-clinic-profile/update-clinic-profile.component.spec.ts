import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UpdateClinicProfileComponent } from './update-clinic-profile.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Clinic } from '../../app-api/clinic';

class MockMatDialogRef {
    open = () => {}
    close = () => {}
}

describe('UpdateClinicProfileComponent', () => {
  let component: UpdateClinicProfileComponent;
  let fixture: ComponentFixture<UpdateClinicProfileComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
