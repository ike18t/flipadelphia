import { FlipperService } from './flipper.service';
import { LocalStorageFlipperService } from './local-storage-flipper.service';

export class Flipadelphia {
  public flipperService: FlipperService;

  constructor(flipperService?: FlipperService) {
    this.flipperService = flipperService || new LocalStorageFlipperService();
  }
}

export function Flip(defaultValue: boolean = false):
  <T extends Flipadelphia & Record<K, boolean>, K extends string>(target: T, key: K) => void {
    return function<T extends Flipadelphia & Record<K, boolean>, K extends string>(target: T, key: K) {
      const flipadelphiaConstructor = target.constructor as any;
      flipadelphiaConstructor.flips = (flipadelphiaConstructor.flips || []).concat(key);
      Object.defineProperty(target, key, {
        get(): boolean {
          return defaultValue || this.flipperService.isEnabled(key);
        }
      });
  };
}
