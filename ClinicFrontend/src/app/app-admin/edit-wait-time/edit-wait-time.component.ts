//Ng CORE
import { Component } from '@angular/core';

//Ng MATERIAL
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-edit-wait-time',
  templateUrl: './edit-wait-time.component.html',
  styleUrls: ['./edit-wait-time.component.css']
})
export class EditWaitTimeComponent {

  constructor(private dialogRef: MatDialogRef<EditWaitTimeComponent>) { }

  save(): void {
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
