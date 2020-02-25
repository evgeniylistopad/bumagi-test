import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LoaderComponent } from "./components/loader/loader.component";
import { AppOverlayModule } from './overlay/overlay.module';
import { ToastModule } from './toast/toast.module';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './components/dropdown/dropdown.component';

@NgModule({
  imports: [
      CommonModule,
      AppOverlayModule,
      ToastModule,
      ReactiveFormsModule
    ],
  declarations: [
      LoaderComponent,
      DropdownComponent,
    ],
  exports: [
    CommonModule, 
    AppOverlayModule, 
    LoaderComponent, 
    ToastModule,
    ReactiveFormsModule,
    DropdownComponent,
  ]
})
export class SharedModule {}
