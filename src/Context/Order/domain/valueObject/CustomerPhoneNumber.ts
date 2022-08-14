import { StringValueObject } from '../../../Common/domain/valueObject/StringValueObject';

export class CustomerPhoneNumber extends StringValueObject {
  constructor(value: string) {
    super(value);
  }
}
