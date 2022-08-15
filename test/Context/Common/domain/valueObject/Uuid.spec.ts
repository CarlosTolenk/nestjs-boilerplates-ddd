import { Uuid } from '../../../../../src/Context/Common/domain/valueObject/Uuid';

class UuidTest extends Uuid {}

describe('Uuid', () => {
  it('should defined', () => {
    const uuid = new UuidTest(Uuid.random().value);
    expect(uuid).toBeDefined();
    expect(uuid.toString()).toEqual(uuid.value);
  });
});
