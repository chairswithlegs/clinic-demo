import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
