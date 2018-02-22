import { FlipperService } from './flipper.service';
import { Flips } from './flips';
import { LocalStorageFlipperService } from './local-storage-flipper.service';

export class Flipadelphia {
  public flipperService: FlipperService;

  constructor(flipperService?: FlipperService) {
    this.flipperService = flipperService || new LocalStorageFlipperService();
  }
}

export function Flip(defaultValue: boolean = false, message?: string):
  <T extends Flipadelphia & Record<K, boolean>, K extends string>(target: T, key: K) => void {
    return function<T extends Flipadelphia & Record<K, boolean>, K extends string>(target: T, key: K) {
      const flipadelphiaConstructor = target.constructor as any;
      flipadelphiaConstructor.flips = (flipadelphiaConstructor.flips || {}) as Flips;
      flipadelphiaConstructor.flips[key] = { default: defaultValue, message };
      Object.defineProperty(target, key, {
        get(): boolean {
          return this.flipperService.isEnabled(key, defaultValue);
        }
      });
  };
}
