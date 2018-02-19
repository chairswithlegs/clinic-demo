//Ng CORE
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

//Ng MATERIAL
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

//CUSTOM VALIDATORS
import { AddressValidator } from '../../app-api/address-validator';

//TYPES
import { Clinic } from '../../app-api/clinic';
import { Coords } from '../../app-api/coords';



@Component({
	selector: 'app-update-location',
	templateUrl: './update-location.component.html',
	styleUrls: ['./update-location.component.css']
})
export class UpdateLocationComponent implements OnInit {
	
	addressForm: FormGroup;
	
	constructor(
		private dialogRef: MatDialogRef<UpdateLocationComponent>,
		@Inject(MAT_DIALOG_DATA) private clinic: Clinic,
		private addressValidator: AddressValidator,
		private formBuilder: FormBuilder
	) { }
	
	ngOnInit() {
		this.addressForm = this.formBuilder.group({
			lat: [this.clinic.lat, Validators.required],
			lng: [this.clinic.lng, Validators.required]
		});
		
		this.addressForm.addControl(
			'address',
			new FormControl(
				'',
				Validators.required,
				this.addressValidator.checkAddress(this.addressForm.controls.lat, this.addressForm.controls.lng)
			)
		);
	}
	
	save() {
		if (this.addressForm.valid) {
			this.dialogRef.close({
				address: this.addressForm.controls.address.value,
				lat: this.addressForm.controls.lat.value,
				lng: this.addressForm.controls.lng.value
			});
		}
	}
	
	cancel() {
		this.dialogRef.close();
	}
}
