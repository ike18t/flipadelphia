import { Inject, Injectable, InjectionToken } from '@angular/core';
import { FEATURE_TOGGLES, FeatureToggles } from './feature-toggles';
import { FlipperService } from './flipper-service';

export const LOCAL_STORAGE = new InjectionToken<Storage>('LocalStorage');

@Injectable()
export class LocalStorageFlipperService implements FlipperService {
  readonly LOCAL_STORAGE_KEY = 'FLIPADELPHIA';

  constructor(@Inject(FEATURE_TOGGLES) private readonly featureToggles: FeatureToggles,
              @Inject(LOCAL_STORAGE) private readonly localStorage: Storage) {}

  private get enabledToggles() {
    return JSON.parse(this.localStorage.getItem(this.LOCAL_STORAGE_KEY) || '') || [] as string[];
  }

  disable(toggleName: string): void {
    if (!this.isEnabled(toggleName)) {
      return;
    }
    this.localStorage.setItem(this.LOCAL_STORAGE_KEY,
                              JSON.stringify(this.enabledToggles.filter((toggle: string) => toggle !== toggleName)));
  }

  enable(toggleName: string): void {
    if (this.isEnabled(toggleName)) {
      return;
    }
    this.localStorage.setItem(this.LOCAL_STORAGE_KEY,
                              JSON.stringify(this.enabledToggles.concat(toggleName)));
  }

  isEnabled(toggleName: string): boolean {
    if (this.featureToggles[toggleName]) {
      return true;
    }
    return this.enabledToggles.includes(toggleName);
  }
}
