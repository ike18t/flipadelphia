import { Component, Input, OnInit } from '@angular/core';
import { Flipadelphia } from './flipadelphia';
import { Flips } from './flips';

@Component({
  selector: 'flipadelphia',
  styles: [
    'ul { list-style: none; }',
    '.message { display: block; }'
  ],
  template: `
    <ul>
      <li *ngFor='let flipName of flipKeys'>
        <label>
          <input type='checkbox'
            [id]='flipName'
            [checked]='flipadelphia[flipName]'
            (change)='setToggleState($event.target)'/>
          {{ flipName }} (default: {{ flips[flipName].default }})
        </label>
        <span class="message">{{ flips[flipName].message }}</span>
      </li>
    </ul>
  `
})
export class FlipadelphiaComponent implements OnInit {
  @Input('flipadelphiaInstance') flipadelphia: Flipadelphia;

  flips: Flips = {};
  get flipKeys() {
    return Object.keys(this.flips);
  }

  ngOnInit() {
    this.flips = (this.flipadelphia.constructor as any).flips as Flips;
  }

  public setToggleState(target: HTMLInputElement) {
    if (target.checked) {
      this.flipadelphia.flipperService.enable(target.id);
    } else {
      this.flipadelphia.flipperService.disable(target.id);
    }
  }
}
