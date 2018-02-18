import { InjectionToken } from '@angular/core';

export const FEATURE_TOGGLES = new InjectionToken<FeatureToggles>('FeatureToggles');

export interface FeatureToggles {
  [key: string]: boolean
}
