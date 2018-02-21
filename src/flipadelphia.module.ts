import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlipadelphiaComponent } from './flipadelphia.component';

@NgModule({
  declarations: [
    FlipadelphiaComponent
  ],
  exports: [
    FlipadelphiaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class FlipadelphiaModule {}
