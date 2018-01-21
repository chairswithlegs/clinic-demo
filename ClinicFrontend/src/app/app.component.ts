//Ng CORE
import { Component } from '@angular/core';

//SERVICES
import { AuthService } from './app-api/auth.service';

//TYPES
import { AuthState } from './app-api/auth-state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //Expose the AuthState enum to the template
  private loggedOut: AuthState = AuthState.LoggedOut;
  private clinicAdmin: AuthState = AuthState.ClinicAdmin;
  private siteAdmin: AuthState = AuthState.SiteAdmin;

  constructor(private authService: AuthService) {}
}
