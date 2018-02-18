import { InjectionToken} from '@angular/core';

export const FLIPPER_SERVICE = new InjectionToken<FlipperService>('FlipperService');

export interface FlipperService {
  isEnabled(key: string): boolean;
  enable(toggleName: string): void;
  disable(toggleName: string): void;
}
