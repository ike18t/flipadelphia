import { Mock } from 'ts-mocks';
import { FlipperService } from './flipper.service';
import { TestFlipadelphia } from './test-fixtures';

describe('flipadelphia', () => {
  it('uses the default value provided in the fixture', () => {
    const flipperService = new Mock<FlipperService>({ isEnabled: () => false });
    const flipadelphia = new TestFlipadelphia(flipperService.Object);
    expect(flipadelphia.bazz).toBe(true);
  });

  it('overrides the default value provided in the fixture', () => {
    const flipperService = new Mock<FlipperService>({ isEnabled: () => true });
    const flipadelphia = new TestFlipadelphia(flipperService.Object);
    expect(flipadelphia.bar).toBe(true);
  });
});
