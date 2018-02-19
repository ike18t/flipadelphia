import { Mock } from 'ts-mocks';
import { LocalStorageFlipperService } from './local-storage-flipper.service';

describe('LocalStorageFlipperService', () => {
  let service: LocalStorageFlipperService;
  let mockStorage: Mock<Storage>;

  beforeEach(() => {
    service = new LocalStorageFlipperService((mockStorage = new Mock<Storage>()).Object);
  });

  describe('isEnabled', () => {
    it('returns true if the key is returned from the persisted array', () => {
      mockStorage.extend({ getItem: () => '["foo", "bar"]' });
      expect(service.isEnabled('bar')).toBe(true);
    });

    it('returns false if the key is not returned from the persisted array and the initial value is false', () => {
      mockStorage.extend({ getItem: () => '["foo"]' });
      expect(service.isEnabled('bar')).toBe(false);
    });

    it('uses the correct key for local storage lookup', () => {
      mockStorage.extend({ getItem: () => '[]' });
      service.isEnabled('bar');
      expect(mockStorage.Object.getItem).toHaveBeenCalledWith('FLIPADELPHIA');
    });
  });

  describe('enable', () => {
    it('does not add an already enabled toggle to storage', () => {
      mockStorage.extend({ getItem: () => '["bar"]',
                           setItem: Mock.ANY_FUNC });
      service.enable('bar');
      expect(mockStorage.Object.setItem).not.toHaveBeenCalled();
    });

    it('adds toggle to storage', () => {
      mockStorage.extend({ getItem: () => '[]',
                           setItem: Mock.ANY_FUNC });
      service.enable('bar');
      expect(mockStorage.Object.setItem).toHaveBeenCalledWith('FLIPADELPHIA', '["bar"]');
    });

    it('appends the toggle to storage array', () => {
      mockStorage.extend({ getItem: () => '["foo"]',
                           setItem: Mock.ANY_FUNC });
      service.enable('bar');
      expect(mockStorage.Object.setItem).toHaveBeenCalledWith('FLIPADELPHIA', '["foo","bar"]');
    });
  });

  describe('disable', () => {
    it('does not write to local storage if the toggle is already disabled', () => {
      mockStorage.extend({ getItem: () => '[]',
                           setItem: Mock.ANY_FUNC });
      service.disable('bar');
      expect(mockStorage.Object.setItem).not.toHaveBeenCalled();
    });

    it('removes the toggle from local storage', () => {
      mockStorage.extend({ getItem: () => '["foo"]',
                           setItem: Mock.ANY_FUNC });
      service.disable('foo');
      expect(mockStorage.Object.setItem).toHaveBeenCalledWith('FLIPADELPHIA', '[]');
    });
  });
});
