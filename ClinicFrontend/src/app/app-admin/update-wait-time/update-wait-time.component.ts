//Ng CORE
import { Component, Inject } from '@angular/core';

//Ng MATERIAL
import { MatDialogRef } from '@angular/material';

//SERVICES
import { ClinicService } from '../../app-api/clinic.service';

@Component({
    selector: 'app-edit-wait-time',
    templateUrl: './update-wait-time.component.html',
    styleUrls: ['./update-wait-time.component.css']
})
export class UpdateWaitTimeComponent {
    
    constructor(private dialogRef: MatDialogRef<UpdateWaitTimeComponent>) { }
    
    save(waitTime: number): void {
        this.dialogRef.close(waitTime);
    }
    
    cancel(): void {
        this.dialogRef.close();
    }
}
