import { OverlayRef } from "@angular/cdk/overlay";

export class ToastRef {
  constructor(private readonly overlay: OverlayRef) {}

  close() {
    this.overlay.dispose();
  }

  getPosition() {
    return this.overlay && this.overlay.overlayElement
      ? this.overlay.overlayElement.getBoundingClientRect()
      : null;
  }
}
