import { EnumValueObject } from '../../../../../src/Context/Common/domain/valueObject/EnumValueObject';

const VALID_VALUES = ['value1', 'value2'];

class EnumValueObjectTest extends EnumValueObject<any> {
  constructor(value: any) {
    super(value, VALID_VALUES);
  }

  protected throwErrorForInvalidValue(value: any): void {
    throw new Error(`${value} is not valid in enum`);
  }
}

describe('EnumValueObject', () => {
  it('should defined', () => {
    const valueObjectEnum = new EnumValueObjectTest('value1');
    expect(valueObjectEnum).toBeDefined();
  });

  it('should it not defined', () => {
    try {
      const result = new EnumValueObjectTest('value');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toEqual(new Error('value is not valid in enum'));
    }
  });
});
