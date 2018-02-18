import { Mock } from 'ts-mocks';
import { LocalStorageFlipperService } from './local-storage-flipper.service';

describe('LocalStorageFlipperService', () => {
  let service: LocalStorageFlipperService;
  let mockStorage: Mock<Storage>;

  beforeEach(() => {
    service = new LocalStorageFlipperService({ foo: true, bar: false },
                                             (mockStorage = new Mock<Storage>()).Object);
  });

  describe('isEnabled', () => {
    it('returns true if the provided featureToggles initial value is true', async () => {
      expect(await service.isEnabled('foo')).toBe(true);
    });

    it('returns true if the key is returned from the persisted array', async () => {
      mockStorage.extend({ getItem: () => '["foo", "bar"]' });
      expect(await service.isEnabled('bar')).toBe(true);
    });

    it('returns false if the key is not returned from the persisted array and the initial value is false', async () => {
      mockStorage.extend({ getItem: () => '["foo"]' });
      expect(await service.isEnabled('bar')).toBe(false);
    });

    it('uses the correct key for local storage lookup', () => {
      mockStorage.extend({ getItem: () => '[]' });
      service.isEnabled('bar');
      expect(mockStorage.Object.getItem).toHaveBeenCalledWith('FLIPADELPHIA');
    });
  });

  describe('enable', () => {
    it('does not add an already enabled toggle to storage', async () => {
      mockStorage.extend({ getItem: () => '["bar"]',
                           setItem: Mock.ANY_FUNC });
      await service.enable('bar');
      expect(mockStorage.Object.setItem).not.toHaveBeenCalled();
    });

    it('adds toggle to storage', async () => {
      mockStorage.extend({ getItem: () => '[]',
                           setItem: Mock.ANY_FUNC });
      await service.enable('bar');
      expect(mockStorage.Object.setItem).toHaveBeenCalledWith('FLIPADELPHIA', '["bar"]');
    });

    it('appends the toggle to storage array', async () => {
      mockStorage.extend({ getItem: () => '["foo"]',
                           setItem: Mock.ANY_FUNC });
      await service.enable('bar');
      expect(mockStorage.Object.setItem).toHaveBeenCalledWith('FLIPADELPHIA', '["foo","bar"]');
    });
  });

  describe('disable', () => {
    it('does not write to local storage if the toggle is already disabled', async () => {
      mockStorage.extend({ getItem: () => '[]',
                           setItem: Mock.ANY_FUNC });
      await service.disable('bar');
      expect(mockStorage.Object.setItem).not.toHaveBeenCalled();
    });

    it('removes the toggle from local storage', async () => {
      mockStorage.extend({ getItem: () => '["foo"]',
                           setItem: Mock.ANY_FUNC });
      await service.disable('foo');
      expect(mockStorage.Object.setItem).toHaveBeenCalledWith('FLIPADELPHIA', '[]');
    });
  });
});
