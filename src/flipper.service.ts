export interface FlipperService {
  disable(toggleName: string): void;
  enable(toggleName: string): void;
  isEnabled(key: string): boolean;
}
