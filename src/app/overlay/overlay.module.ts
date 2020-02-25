import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayService } from './overlay.service';
import { OverlayModule } from '@angular/cdk/overlay';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OverlayModule,
  ],
  providers: [OverlayService]
})
export class AppOverlayModule { }
