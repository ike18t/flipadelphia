import { Mock } from 'ts-mocks';
import { FlipperService } from './flipper.service';
import { TestFlipadelphia } from './test-fixtures';

describe('flipadelphia', () => {
  it('returns the value from the service', () => {
    const flipperService = new Mock<FlipperService>({ isEnabled: () => false });
    const flipadelphia = new TestFlipadelphia(flipperService.Object);
    expect(flipadelphia.foo).toBe(false);
    expect(flipperService.Object.isEnabled).toHaveBeenCalledWith('foo', true);
  });
});
