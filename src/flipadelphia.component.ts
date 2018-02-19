import { Component, Input, OnInit } from '@angular/core';
import { Flipadelphia } from './flipadelphia';

@Component({
  selector: 'flipadelphia',
  template: `
    <ul>
      <li *ngFor='let flip of flips'>
        <label>
          <input type='checkbox'
            [id]='flip'
            [checked]='flipadelphia[flip]'
            (change)='setToggleState($event.target)'/>
          {{ flip }}
        </label>
      </li>
    </ul>
  `
})
export class FlipadelphiaComponent implements OnInit {
  @Input('flipadelphiaInstance') flipadelphia: Flipadelphia;

  flips: string[] = [];

  ngOnInit() {
    this.flips = (this.flipadelphia.constructor as any).flips as string[];
  }

  public setToggleState(target: HTMLInputElement) {
    if (target.checked) {
      this.flipadelphia.flipperService.enable(target.id);
    } else {
      this.flipadelphia.flipperService.disable(target.id);
    }
  }
}
