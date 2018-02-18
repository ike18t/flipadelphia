import { InjectionToken } from '@angular/core';

export const FLIPPER_SERVICE = new InjectionToken<FlipperService>('FlipperService');

export interface FlipperService {
  disable(toggleName: string): void;
  enable(toggleName: string): void;
  isEnabled(key: string): boolean;
}
