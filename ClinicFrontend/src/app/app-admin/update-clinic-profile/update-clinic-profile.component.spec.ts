import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClinicProfileComponent } from './update-clinic-profile.component';

describe('UpdateClinicProfileComponent', () => {
  let component: UpdateClinicProfileComponent;
  let fixture: ComponentFixture<UpdateClinicProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateClinicProfileComponent ]
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
