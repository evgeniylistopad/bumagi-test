import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal, ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor(
    private overlay: Overlay
  ) { }

  createOverlay(config: OverlayConfig): OverlayRef {
    return this.overlay.create(config);
  }

  attachTemplatePortal(overlayRef: OverlayRef, templateRef: TemplateRef<any>, vcRef: ViewContainerRef) {
    let templatePortal = new TemplatePortal(templateRef, vcRef);
    overlayRef.attach(templatePortal);
  }

  attachComponentPortal(overlayRef: OverlayRef, component: ComponentType<any>) {
    let componentPortal = new ComponentPortal(component)
    overlayRef.attach(componentPortal)
  }

  positionGloballyCenter(): PositionStrategy {
    return this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically();
  }
}
