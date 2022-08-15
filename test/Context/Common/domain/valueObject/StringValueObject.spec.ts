import { StringValueObject } from '../../../../../src/Context/Common/domain/valueObject/StringValueObject';
import { InvalidArgumentError } from '../../../../../src/Context/Common/domain/exception';

class StringValueObjectTest extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}

describe('StringValueObject', () => {
  it('should defined', () => {
    const expectedValue = 'hello world';

    const valueObject = new StringValueObjectTest(expectedValue);

    expect(valueObject).toBeDefined();
    expect(valueObject.toString()).toEqual(expectedValue);
  });

  it('should it not defined', () => {
    try {
      const valueObject = new StringValueObjectTest('');
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toEqual(
        new InvalidArgumentError(
          `<StringValueObjectTest> does not allow the value empty`,
        ),
      );
    }
  });
});
