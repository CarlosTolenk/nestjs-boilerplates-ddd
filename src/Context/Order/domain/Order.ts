import { AggregateDomainRoot } from '../../Common/domain/AggregateRoot';
import {
  OrderCustomer,
  OrderId,
  OrderStatus,
  StatusOrderAvailable,
} from './valueObject';

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
    return new Order(id, status, customer);
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

  static fromPrimitives(plainData: {
    orderId: string;
    orderStatus: string;
    orderCustomer: { name: string; lastName: string; phoneNumber: string };
  }): Order {
    const status = StatusOrderAvailable[plainData.orderStatus];
    const { name, lastName, phoneNumber } = plainData.orderCustomer;
    return new Order(
      new OrderId(plainData.orderId),
      new OrderStatus(status),
      new OrderCustomer(name, lastName, phoneNumber),
    );
  }
}
