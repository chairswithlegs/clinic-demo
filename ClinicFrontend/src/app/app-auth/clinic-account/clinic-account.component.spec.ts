import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicAccountComponent } from './clinic-account.component';

describe('ClinicAccountComponent', () => {
  let component: ClinicAccountComponent;
  let fixture: ComponentFixture<ClinicAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
