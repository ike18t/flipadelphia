import { ToggleState } from './toggle-state';

export function Flip(enabled?: boolean, name?: string): Function {
  return (target: any, key: string) => {
    const lookup = name || key;
    ToggleState[lookup] = enabled || ToggleState[lookup] || false;

    Object.defineProperty(target, key, {
      get: () => ToggleState[lookup]
    });
  }
}
