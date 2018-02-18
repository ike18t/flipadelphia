import { Component, Inject } from '@angular/core';
import { FEATURE_TOGGLES, FeatureToggles } from './feature-toggles';
import { FLIPPER_SERVICE, FlipperService } from './flipper-service';

@Component({
  selector: 'flipadelphia',
  template: `
    <ul>
      <li *ngFor='let toggle of toggles'>
        <label>
          <input type='checkbox'
            [id]='toggle.key'
            [checked]='toggle.value'
            (change)='setToggleState($event.target)'/>
          {{ toggle.key }}
        </label>
      </li>
    </ul>
  `
})
export class FlipadelphiaComponent {
  constructor(@Inject(FEATURE_TOGGLES) private featureToggles: FeatureToggles,
              @Inject(FLIPPER_SERVICE) private flipperService: FlipperService) {}

  toggles = Object.keys(this.featureToggles)
                  .map((key) => {
                    return { key: key, value: this.featureToggles[key] };
                  });

  public setToggleState(target: HTMLInputElement) {
    if(target.checked) {
      this.flipperService.enable(target.id);
    }
    else {
      this.flipperService.disable(target.id);
    }
  }
}