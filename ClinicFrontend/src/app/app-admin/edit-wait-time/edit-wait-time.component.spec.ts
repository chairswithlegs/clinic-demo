import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWaitTimeComponent } from './edit-wait-time.component';

describe('EditWaitTimeComponent', () => {
  let component: EditWaitTimeComponent;
  let fixture: ComponentFixture<EditWaitTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWaitTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWaitTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
