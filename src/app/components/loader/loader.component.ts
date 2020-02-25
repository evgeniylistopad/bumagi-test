import { Component, OnInit, Input, ViewContainerRef, ViewChild, TemplateRef } from '@angular/core';
import { OverlayService } from 'src/app/overlay/overlay.service';
import { OverlayRef, OverlayConfig } from '@angular/cdk/overlay';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  @Input() backdropEnabled = true;
  @Input() positionGloballyCenter = true;
  @Input() displayProgressLoader: boolean;

  @ViewChild('loaderRef')
  private _loaderRef: TemplateRef<any>;

  private overlayConfig: OverlayConfig;
  private overlayRef: OverlayRef;
  constructor(private vcRef: ViewContainerRef, private overlayService: OverlayService) { }

  ngOnInit() {
    this.overlayConfig = {
      hasBackdrop: this.backdropEnabled
    };
    if (this.positionGloballyCenter) {
      this.overlayConfig['positionStrategy'] = this.overlayService.positionGloballyCenter();
    }
    this.overlayRef = this.overlayService.createOverlay(this.overlayConfig)
  }

  ngDoCheck() {
    if (this.displayProgressLoader && !this.overlayRef.hasAttached() && this._loaderRef) {
      this.overlayService.attachTemplatePortal(this.overlayRef, this._loaderRef, this.vcRef);
    } else if (!this.displayProgressLoader && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
    }
  }

}
