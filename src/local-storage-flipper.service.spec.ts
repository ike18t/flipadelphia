import { Mock } from 'ts-mocks';
import { LocalStorageFlipperService } from './local-storage-flipper.service';

describe('LocalStorageFlipperService', () => {
  let service: LocalStorageFlipperService;
  let mockStorage: Mock<Storage>;

  beforeEach(() => {
    service = new LocalStorageFlipperService('FLIPADELPHIA', (mockStorage = new Mock<Storage>()).Object);
  });

  describe('isEnabled', () => {
    beforeEach(() => {
      mockStorage.extend({ getItem: () => '{"foo": true, "bar": false }' });
    });

    it('returns true if the key is returned from the persisted object', () => {
      expect(service.isEnabled('foo')).toBe(true);
    });

    it('returns false if the value is false in the persisted object and the initial value is false', () => {
      expect(service.isEnabled('bar', true)).toBe(false);
    });

    it('returns true if the default value true and there is no key in storage', () => {
      expect(service.isEnabled('bah', true)).toBe(true);
    });

    it('uses the provided key for local storage lookup', () => {
      service.isEnabled('bar');
      expect(mockStorage.Object.getItem).toHaveBeenCalledWith('FLIPADELPHIA');
    });
  });

  describe('enable', () => {
    it('adds toggle to storage', () => {
      mockStorage.extend({ getItem: () => '{"foo":false}',
                           setItem: Mock.ANY_FUNC });
      service.enable('bar');
      expect(mockStorage.Object.setItem).toHaveBeenCalledWith('FLIPADELPHIA', '{"foo":false,"bar":true}');
    });

    it('updates value in storage', () => {
      mockStorage.extend({ getItem: () => '{"bar": false}',
                           setItem: Mock.ANY_FUNC });
      service.enable('bar');
      expect(mockStorage.Object.setItem).toHaveBeenCalledWith('FLIPADELPHIA', '{"bar":true}');
    });
  });

  describe('disable', () => {
    it('adds toggle to storage', () => {
      mockStorage.extend({ getItem: () => '{"foo":false}',
                           setItem: Mock.ANY_FUNC });
      service.disable('bar');
      expect(mockStorage.Object.setItem).toHaveBeenCalledWith('FLIPADELPHIA', '{"foo":false,"bar":false}');
    });

    it('updates value in storage', () => {
      mockStorage.extend({ getItem: () => '{"bar": true}',
                           setItem: Mock.ANY_FUNC });
      service.disable('bar');
      expect(mockStorage.Object.setItem).toHaveBeenCalledWith('FLIPADELPHIA', '{"bar":false}');
    });
  });
});
