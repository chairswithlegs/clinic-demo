//Ng CORE
import { Component, Inject } from '@angular/core';

//Ng MATERIAL
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-confirm-deletion',
    templateUrl: './confirm-deletion.component.html',
    styleUrls: ['./confirm-deletion.component.css']
})
export class ConfirmDeletionComponent {
    
    constructor(private dialogRef: MatDialogRef<ConfirmDeletionComponent>) { }
    
    delete(): void {
        this.dialogRef.close(true);
    }
    
    cancel(): void {
        this.dialogRef.close();
    }
    
}
