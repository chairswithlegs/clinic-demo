//Ng CORE
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

//Ng MATERIAL
import { MatSnackBar } from '@angular/material/snack-bar';

//SERVICES
import { AuthService } from '../../app-api/auth.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	public form: FormGroup; // our model driven form
	
	constructor(private formBuilder: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
		this.form = formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	} 
	
	onSubmit(form: FormGroup) {
		//Ensure page is valid before sending request
		if (form.valid) {
			//Query the api
			this.authService.login(form.value.username, form.value.password).take(1).subscribe((success) => {
				if (success) {
					//Navigate to the dashboard if the login was a success
					this.router.navigateByUrl('admin-dashboard');
				} else {
					//Show an alert if the login fails
					this.snackBar.open('Invalid username or password.', 'Dismiss');
				}
			});
		}
	}
}