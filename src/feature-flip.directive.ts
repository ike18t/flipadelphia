import { NgIf } from '@angular/common';
import { Directive, Inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { FLIPPER_SERVICE, FlipperService } from './flipper.service';

@Directive({
  selector: '[feature-flip]',
})
export class FeatureFlipDirective extends NgIf implements OnInit {
  @Input('feature-flip') featureFlip: string;

  constructor(@Inject(FLIPPER_SERVICE) readonly flipperService: FlipperService,
              view: ViewContainerRef,
              template: TemplateRef<any>) {
    super(view, template);
    this.ngIf = false;
  }

  async ngOnInit() {
    this.ngIf = await this.flipperService.isEnabled(this.featureFlip);
  }
}
