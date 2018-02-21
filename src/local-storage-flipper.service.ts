import { FlipperService } from './flipper.service';

export class LocalStorageFlipperService implements FlipperService {
  constructor(private readonly storageKey = 'FLIPADELPHIA',
              private readonly localStorage = window.localStorage) {}

  private get toggles(): { [key: string]: boolean } {
    return JSON.parse(this.localStorage.getItem(this.storageKey) as string) || {};
  }

  disable(toggleName: string): void {
    this.toggle(toggleName, false);
  }

  enable(toggleName: string): void {
    this.toggle(toggleName, true);
  }

  isEnabled(toggleName: string, defaultValue: boolean = false): boolean {
    return this.toggles[toggleName] || defaultValue;
  }

  private toggle(toggleName: string, enable: boolean) {
    const toggles = this.toggles;
    toggles[toggleName] = enable;
    this.localStorage.setItem(this.storageKey,
                              JSON.stringify(toggles));
  }
}
