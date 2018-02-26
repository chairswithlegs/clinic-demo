//This module handles standalone components

//MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from '../app-material/app-material.module';
import { RouterModule } from '@angular/router';

//COMPONENTS AND DIRECTIVES
import { AboutComponent } from './about/about.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
	imports: [
		CommonModule,
		AppMaterialModule,
		RouterModule
	],
	declarations: [
		AboutComponent,
		WelcomeComponent,
		PageNotFoundComponent
	],
	exports: [
		AboutComponent,
		WelcomeComponent,
		PageNotFoundComponent
	]
})
export class CoreModule { }
