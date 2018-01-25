import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewClinicFormComponent } from './new-clinic-form.component';

describe('NewClinicFormComponent', () => {
  let component: NewClinicFormComponent;
  let fixture: ComponentFixture<NewClinicFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewClinicFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewClinicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
