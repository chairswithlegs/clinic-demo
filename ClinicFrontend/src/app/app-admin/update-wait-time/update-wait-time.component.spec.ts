import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWaitTimeComponent } from './update-wait-time.component';

describe('UpdateWaitTimeComponent', () => {
  let component: UpdateWaitTimeComponent;
  let fixture: ComponentFixture<UpdateWaitTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWaitTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWaitTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
