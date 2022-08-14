import { EnumValueObject } from '../../../Common/domain/valueObject/EnumValueObject';
import { InvalidArgumentError } from '../../../Common/domain/exception';

export enum StatusOrderAvailable {
  RECEIVED = 'RECEIVED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export class OrderStatus extends EnumValueObject<StatusOrderAvailable> {
  constructor(value: StatusOrderAvailable) {
    super(value, Object.values(StatusOrderAvailable));
  }

  protected throwErrorForInvalidValue(value: StatusOrderAvailable): void {
    throw new InvalidArgumentError(`The status order ${value} is invalid`);
  }
}
