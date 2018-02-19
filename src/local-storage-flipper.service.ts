import { Inject, Injectable, InjectionToken } from '@angular/core';
import { FEATURE_TOGGLES, FeatureToggles } from './feature-toggles';
import { FlipperService } from './flipper.service';

export const LOCAL_STORAGE = new InjectionToken<Storage>('LocalStorage');

@Injectable()
export class LocalStorageFlipperService implements FlipperService {
  readonly LOCAL_STORAGE_KEY = 'FLIPADELPHIA';

  constructor(@Inject(FEATURE_TOGGLES) private readonly featureToggles: FeatureToggles,
              @Inject(LOCAL_STORAGE) private readonly localStorage: Storage) {}

  private get enabledToggles() {
    return JSON.parse(this.localStorage.getItem(this.LOCAL_STORAGE_KEY) as string) || [] as string[];
  }

  async disable(toggleName: string): Promise<void> {
    if (!await this.isEnabled(toggleName)) {
      return;
    }
    this.localStorage.setItem(this.LOCAL_STORAGE_KEY,
                              JSON.stringify(this.enabledToggles.filter((toggle: string) => toggle !== toggleName)));
  }

  async enable(toggleName: string): Promise<void> {
    if (await this.isEnabled(toggleName)) {
      return;
    }
    this.localStorage.setItem(this.LOCAL_STORAGE_KEY,
                              JSON.stringify(this.enabledToggles.concat(toggleName)));
  }

  async isEnabled(toggleName: string): Promise<boolean> {
    if (this.featureToggles[toggleName]) {
      return true;
    }
    return this.enabledToggles.includes(toggleName);
  }
}
