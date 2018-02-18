import { InjectionToken } from '@angular/core';

export const FLIPPER_SERVICE = new InjectionToken<FlipperService>('FlipperService');

export interface FlipperService {
  disable(toggleName: string): Promise<void>;
  enable(toggleName: string): Promise<void>;
  isEnabled(key: string): Promise<boolean>;
}
