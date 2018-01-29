//Ng CORE
import { Component, Inject, OnInit } from '@angular/core';

//Ng MATERIAL
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

//TYPES
import { Clinic } from '../../app-api/clinic';

@Component({
    selector: 'app-update-clinic-profile',
    templateUrl: './update-clinic-profile.component.html',
    styleUrls: ['./update-clinic-profile.component.css']
})
export class UpdateClinicProfileComponent implements OnInit {
    name: string;
    description: string;
    
    constructor(private dialogRef: MatDialogRef<UpdateClinicProfileComponent>, @Inject(MAT_DIALOG_DATA) private clinic: Clinic) { }
    
    ngOnInit() {
        this.name = this.clinic.name;
        this.description = this.clinic.description;
    }

    save() {
        this.dialogRef.close({ name: this.name, description: this.description });
    }

    cancel() {
        this.dialogRef.close();
    }
}
