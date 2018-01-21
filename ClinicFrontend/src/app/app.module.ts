//Top level module for bootstrapping the application

//MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from './core/core.module';
import { AppAuthModule } from './app-auth/app-auth.module';
import { AppClinicModule } from './app-clinic/app-clinic.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppMaterialModule } from './app-material/app-material.module';

//COMPONENTS AND DIRECTIVES
import { AppComponent } from './app.component';
import { AboutComponent } from './core/about/about.component';
import { PageNotFoundComponent } from './core/page-not-found/page-not-found.component';
import { WelcomeComponent } from './core/welcome/welcome.component';

//SERVICES
import { ClinicService } from './app-api/clinic.service';
import { AuthService } from './app-api/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppAuthModule,
    AppClinicModule,
    AppRoutingModule,
    AppMaterialModule,
    CoreModule
  ],
  providers: [
    ClinicService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
