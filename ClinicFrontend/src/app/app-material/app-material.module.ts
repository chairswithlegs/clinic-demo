import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatButtonModule, MatIconModule, MatPaginatorModule, MatMenuModule, MatInputModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatMenuModule,
    MatInputModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatMenuModule,
    MatInputModule
  ],
  declarations: []
})
export class AppMaterialModule { }