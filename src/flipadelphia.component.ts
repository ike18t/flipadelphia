import { Component, Inject } from '@angular/core';
import { FEATURE_TOGGLES, FeatureToggles } from './feature-toggles';
import { FLIPPER_SERVICE, FlipperService } from './flipper.service';

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
  toggles: any;

  constructor(@Inject(FEATURE_TOGGLES) readonly featureToggles: FeatureToggles,
              @Inject(FLIPPER_SERVICE) private readonly flipperService: FlipperService) {
    this.loadToggles(featureToggles);
  }

  public setToggleState(target: HTMLInputElement) {
    if (target.checked) {
      this.flipperService.enable(target.id);
    } else {
      this.flipperService.disable(target.id);
    }
  }

  private async loadToggles(featureToggles: FeatureToggles) {
    const toggles = Object.keys(featureToggles);
    const values = await Promise.all(toggles.map(key => this.flipperService.isEnabled(key)));
    this.toggles = toggles.map((toggle, index) => ({ key: toggle, value: values[index] }));
  }
}
