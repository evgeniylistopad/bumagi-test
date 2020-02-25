import { Injectable, Injector } from "@angular/core";
import { Overlay } from "@angular/cdk/overlay";
import { ToastData } from "./toast-config";
import { ComponentPortal, PortalInjector } from "@angular/cdk/portal";
import { ToastComponent } from "./toast/toast.component";
import { ToastRef } from "./toast-ref";

@Injectable({
  providedIn: "root"
})
export class ToastService {
  private lastToast: ToastRef;

  constructor(private overlay: Overlay, private parentInjector: Injector) {}

  show(data: ToastData) {
    const positionStrategy = this.overlay
      .position()
      .global()
      .right()
      .top(this.getPosition());

    const overlayRef = this.overlay.create({ positionStrategy });

    const toastRef = new ToastRef(overlayRef);
    this.lastToast = toastRef;

    const injector = this.getInjector(data, toastRef, this.parentInjector);
    const toastPortal = new ComponentPortal(ToastComponent, null, injector);

    overlayRef.attach(toastPortal);

    return toastRef;
  }

  getPosition() {
    const position = (this.lastToast && this.lastToast.getPosition()) ? this.lastToast.getPosition().bottom : 0;
    return position + "px";
  }

  getInjector(data: ToastData, toastRef: ToastRef, parentInjector: Injector) {
    const tokens = new WeakMap();

    tokens.set(ToastData, data);
    tokens.set(ToastRef, toastRef);

    return new PortalInjector(parentInjector, tokens);
  }
}
