import { StringValueObject } from '../../../Common/domain/valueObject/StringValueObject';

export class CustomerName extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
