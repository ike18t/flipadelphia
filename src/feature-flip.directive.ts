import { NgIf, NgIfContext } from '@angular/common';
import { Directive, Inject, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { FLIPPER_SERVICE, FlipperService } from './flipper.service';

@Directive({
  selector: '[feature-flip]',
})
export class FeatureFlipDirective extends NgIf {
  @Input('feature-flip') featureFlip: string;

  constructor(@Inject(FLIPPER_SERVICE) readonly flipperService: FlipperService,
              readonly view: ViewContainerRef,
              readonly template: TemplateRef<NgIfContext>) {
    super(view, template);
    this.ngIf = this.flipperService.isEnabled(this.featureFlip);
  }
}
