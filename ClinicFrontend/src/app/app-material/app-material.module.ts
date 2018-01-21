//This module exists to manage the numerous imports from the Ng Material package

//MODULES
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatToolbarModule, 
  MatButtonModule, 
  MatIconModule, 
  MatPaginatorModule, 
  MatMenuModule, 
  MatInputModule, 
  MatSnackBarModule, 
  MatDialogModule,
  MatSliderModule
} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatMenuModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSliderModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatMenuModule,
    MatInputModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSliderModule
  ],
  declarations: []
})
export class AppMaterialModule { }