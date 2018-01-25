import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateClinicMenuComponent } from './update-clinic-menu.component';

describe('UpdateClinicMenuComponent', () => {
  let component: UpdateClinicMenuComponent;
  let fixture: ComponentFixture<UpdateClinicMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateClinicMenuComponent ]
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
