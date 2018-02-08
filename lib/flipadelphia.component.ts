import { Component } from '@angular/core';
import { ToggleState } from './toggle-state';

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
  toggles = Object.keys(ToggleState)
                  .map((key) => {
                    return { key: key, value: ToggleState[key] };
                  });

  public setToggleState(target: HTMLInputElement) {
    ToggleState[target.id] = target.checked;
  }
}
