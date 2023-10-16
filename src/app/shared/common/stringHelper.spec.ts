import { StringHelper } from "./stringHelper";

describe('StringHelper', () => {

  describe('generateGuid', () => {
    it('should generate a valid GUID', () => {
      // Act
      const guid = StringHelper.generateGuid();

      // Assert
      expect(guid).toMatch(/^\w{8}-\w{4}-\w{4}-\w{4}-\w{12}$/);
    });
  });

  describe('nameInitialGenerator', () => {
    it('should return an empty string when input is null or undefined', () => {
      expect(StringHelper.nameInitialGenerator(null)).toEqual('');
      expect(StringHelper.nameInitialGenerator(undefined)).toEqual('');
    });

    it('should return an empty string when input is not a string', () => {
      expect(StringHelper.nameInitialGenerator(42)).toEqual('');
      expect(StringHelper.nameInitialGenerator(true)).toEqual('');
      expect(StringHelper.nameInitialGenerator([])).toEqual('');
      expect(StringHelper.nameInitialGenerator({})).toEqual('');
    });

    it('should return initials of a single word', () => {
      expect(StringHelper.nameInitialGenerator('John')).toEqual('J');
      expect(StringHelper.nameInitialGenerator('Alice')).toEqual('A');
    });

    it('should return initials of multiple words', () => {
      expect(StringHelper.nameInitialGenerator('John Doe')).toEqual('JD');
      expect(StringHelper.nameInitialGenerator('Alice Eve Smith')).toEqual('AES');
    });

    it('should ignore non-alphabetic characters in initials', () => {
      // expect(StringHelper.nameInitialGenerator('1Bob 2Ross')).toEqual('BR');
      expect(StringHelper.nameInitialGenerator('A& B% C*')).toEqual('ABC');
    });
  });

  describe('formatStorageUnit', () => {
    it('should return 0 Mo when input is null or undefined', () => {
      expect(StringHelper.formatStorageUnit(null)).toEqual('0 Mo');
      expect(StringHelper.formatStorageUnit(undefined)).toEqual('0 Mo');
    });

    it('should return 0 Mo when input is less than or equal to 1', () => {
      expect(StringHelper.formatStorageUnit(0)).toEqual('0 Mo');
      expect(StringHelper.formatStorageUnit(1)).toEqual('100 Mo');
    });



    it('should return value - 1 and Go for values greater than 1', () => {
      expect(StringHelper.formatStorageUnit(2)).toEqual('1 Go');
      expect(StringHelper.formatStorageUnit(42)).toEqual('41 Go');
      expect(StringHelper.formatStorageUnit(1024)).toEqual('1023 Go');
    });
  });

});
