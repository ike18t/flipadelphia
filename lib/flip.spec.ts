import { Flip } from './flip';
import { ToggleState } from './toggle-state';

describe('Flip', () => {
  beforeEach(() => {
    Object.keys(ToggleState).forEach((t) => delete ToggleState[t]);
  });

  it('should create the state entry with the default false value', () => {
    class Foo {
      @Flip() public bar: boolean;
    }
    expect(ToggleState['bar']).toBe(false);
  });

  it('should return the value from ToggleState', () => {
    class Foo {
      @Flip() public bar: boolean;
    }
    ToggleState['bar'] = true;
    expect(new Foo().bar).toBe(true);
  });
});
