import { FlipperService } from './flipper.service';

export class LocalStorageFlipperService implements FlipperService {
  readonly LOCAL_STORAGE_KEY = 'FLIPADELPHIA';

  constructor(public localStorage = window.localStorage) {}

  private get enabledToggles() {
    return JSON.parse(this.localStorage.getItem(this.LOCAL_STORAGE_KEY) as string) || [] as string[];
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
    return this.enabledToggles.includes(toggleName);
  }
}
