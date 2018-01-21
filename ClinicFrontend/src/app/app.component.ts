import { Component } from '@angular/core';
import { AuthService } from './app-auth/auth.service';
import { AuthState } from './app-auth/auth-state';

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
