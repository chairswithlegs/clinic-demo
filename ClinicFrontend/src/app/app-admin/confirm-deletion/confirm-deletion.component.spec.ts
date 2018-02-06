import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { ConfirmDeletionComponent } from './confirm-deletion.component';

class MockMatDialogRef {
    open = () => {}
    close = () => {}
}

describe('ConfirmDeletionComponent', () => {
  let component: ConfirmDeletionComponent;
  let fixture: ComponentFixture<ConfirmDeletionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeletionComponent ],
      providers: [
          { provide: MatDialogRef, useClass: MockMatDialogRef }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
