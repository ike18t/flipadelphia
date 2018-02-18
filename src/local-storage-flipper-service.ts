import { Inject, Injectable, InjectionToken} from '@angular/core';
import { FlipperService } from './flipper-service';
import { FEATURE_TOGGLES, FeatureToggles } from './feature-toggles';

export const LOCAL_STORAGE = new InjectionToken<Storage>('LocalStorage');

@Injectable()
export class LocalStorageFlipperService implements FlipperService {

  constructor(@Inject(FEATURE_TOGGLES) private featureToggles: FeatureToggles,
              @Inject(LOCAL_STORAGE) private localStorage: Storage) {}

  readonly LOCAL_STORAGE_KEY = 'FLIPADELPHIA';

  private get enabledToggles() {
    return JSON.parse(this.localStorage.getItem(this.LOCAL_STORAGE_KEY) || '') || [] as string[];
  }

  isEnabled(toggleName: string): boolean {
    if (this.featureToggles[toggleName]) {
      return true;
    }
    return this.enabledToggles.includes(toggleName);
  }

  enable(toggleName: string): void {
    if (this.isEnabled(toggleName)) {
      return;
    }
    this.localStorage.setItem(this.LOCAL_STORAGE_KEY,
                              JSON.stringify(this.enabledToggles.concat(toggleName)));
  }

  disable(toggleName: string): void {
    if (!this.isEnabled(toggleName)) {
      return;
    }
    this.localStorage.setItem(this.LOCAL_STORAGE_KEY,
                              JSON.stringify(this.enabledToggles.filter((toggle: string) => toggle !== toggleName)));
  }
}
