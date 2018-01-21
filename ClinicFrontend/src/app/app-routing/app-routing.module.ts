//This module configures the router
//Provides the AuthGuardService (from this module)

//MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppAuthModule } from '../app-auth/app-auth.module';

//COMPONENTS AND DIRECTIVES
//Route components
import { RouterModule } from '@angular/router';
import { ClinicListComponent } from '../app-clinic/clinic-list/clinic-list.component';
import { ClinicDetailComponent } from '../app-clinic/clinic-detail/clinic-detail.component';
import { ClinicAccountComponent } from '../app-auth/clinic-account/clinic-account.component';
import { AdminAccountComponent } from '../app-auth/admin-account/admin-account.component';
import { PageNotFoundComponent } from '../core/page-not-found/page-not-found.component';
import { AboutComponent } from '../core/about/about.component';
import { WelcomeComponent } from '../core/welcome/welcome.component';
import { LoginComponent } from '../app-auth/login/login.component';

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
        path: 'clinic-account',
        component: ClinicAccountComponent,
        canActivate: [AuthGuardService],
        data: {
            expectedAuthState: AuthState.ClinicAdmin
        }
    },
    {
        path: 'admin-account',
        component: AdminAccountComponent,
        canActivate: [AuthGuardService],
        data: {
            expectedAuthState: AuthState.SiteAdmin
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
        path:'about',
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
]

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes)
    ],
    providers: [AuthGuardService],
    declarations: []
})
export class AppRoutingModule { }
