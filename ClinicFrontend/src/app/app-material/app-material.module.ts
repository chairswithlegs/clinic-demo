import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatPaginatorModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule
  ],
  declarations: []
})
export class AppMaterialModule { }