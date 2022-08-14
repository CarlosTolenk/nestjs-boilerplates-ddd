import { CustomerName } from './CustomerName';
import { CustomerLastName } from './CustomerLastName';
import { CustomerPhoneNumber } from './CustomerPhoneNumber';

export class OrderCustomer {
  readonly name: CustomerName;
  readonly lastName: CustomerLastName;
  readonly phoneNumber: CustomerPhoneNumber;

  constructor(name: string, lastName: string, phoneNumber) {
    this.name = new CustomerName(name);
    this.lastName = new CustomerLastName(lastName);
    this.phoneNumber = new CustomerPhoneNumber(phoneNumber);
  }
}
