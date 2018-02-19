//This module configures the router
//Provides the AuthGuardService (from this module)

//MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//COMPONENTS AND DIRECTIVES
//Route components
import { RouterModule } from '@angular/router';
import { ClinicListComponent } from '../app-clinic/clinic-list/clinic-list.component';
import { ClinicDetailComponent } from '../app-clinic/clinic-detail/clinic-detail.component';
import { DashboardComponent } from '../app-admin/dashboard/dashboard.component';
import { PageNotFoundComponent } from '../core/page-not-found/page-not-found.component';
import { AboutComponent } from '../core/about/about.component';
import { WelcomeComponent } from '../core/welcome/welcome.component';
import { LoginComponent } from '../app-admin/login/login.component';

//SERVICES
import { AuthGuardService } from './auth-guard.service';

//TYPES
import { AuthState } from '../app-api/auth-state';
import { Routes } from '@angular/router';


const routes: Routes = [
	{
		path: 'welcome',
		component: WelcomeComponent
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'admin-dashboard',
		component: DashboardComponent,
		canActivate: [AuthGuardService],
		data: {
			expectedAuthState: AuthState.Admin
		}
	},
	{
		path: 'clinics',
		component: ClinicListComponent,
	},
	{
		path: 'clinics/:clinic-id',
		component: ClinicDetailComponent
	},
	{
		path: 'about',
		component: AboutComponent
	},
	{
		path: '',
		redirectTo: '/welcome',
		pathMatch: 'full'
	},
	{
		path: '**',
		component: PageNotFoundComponent
	}
];

@NgModule({
	imports: [
		CommonModule,
		RouterModule.forRoot(routes)
	],
	providers: [AuthGuardService],
	declarations: []
})
export class AppRoutingModule { }
