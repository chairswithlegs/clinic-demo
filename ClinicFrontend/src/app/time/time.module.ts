//This module provides ways of displaying time-based information

//Ng CORE
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//PIPES
import { MillisecondsToReadablePipe } from './milliseconds-to-readable.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
      MillisecondsToReadablePipe
  ],
  declarations: [MillisecondsToReadablePipe]
})
export class TimeModule { }
