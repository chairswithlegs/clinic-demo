import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ClinicListComponent } from '../app-clinic/clinic-list/clinic-list.component';
import { ClinicDetailComponent } from '../app-clinic/clinic-detail/clinic-detail.component';
import { ClinicAccountComponent } from '../app-auth/clinic-account/clinic-account.component';
import { AdminAccountComponent } from '../app-auth/admin-account/admin-account.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { AboutComponent } from '../about/about.component';

const routes: Routes = [
  {
    path: 'clinic-account',
    component: ClinicAccountComponent
  },
  {
    path: 'admin-account',
    component: AdminAccountComponent
  },
  {
    path: 'clinic',
    component: ClinicListComponent,
  },
  {
    path: 'clinic/:clinic-id',
    component: ClinicDetailComponent
  },
  {
    path:'about',
    component: AboutComponent
  },
  {
    path: '',
    redirectTo: '/clinic',
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
  declarations: []
})
export class AppRoutingModule { }
