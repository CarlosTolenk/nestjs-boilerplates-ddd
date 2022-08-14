import { AggregateDomainRoot } from '../../Common/domain/AggregateRoot';
import { OrderCustomer, OrderId, OrderStatus } from './valueObject';

export class Order extends AggregateDomainRoot {
  readonly id: OrderId;
  readonly status: OrderStatus;
  readonly customer: OrderCustomer;

  private constructor(
    id: OrderId,
    status: OrderStatus,
    customer: OrderCustomer,
  ) {
    super();
    this.id = id;
    this.status = status;
    this.customer = customer;
  }

  static create(
    id: OrderId,
    status: OrderStatus,
    customer: OrderCustomer,
  ): Order {
    const order = new Order(id, status, customer);
    order.record(new Event('ds'));
    return order;
  }

  toPrimitives() {
    return {
      id: this.id.value,
      status: this.status.value,
      customer: {
        name: this.customer.name.value,
        lastName: this.customer.lastName.value,
        phoneNumber: this.customer.phoneNumber.value,
      },
    };
  }
}
