import { Injectable } from '@nestjs/common';
import { UseCases } from '../../../Common/application';

import { OrderRepository } from '../../domain/Order.repository';
import {
  OrderCustomer,
  OrderId,
  OrderStatus,
  StatusOrderAvailable,
} from '../../domain/valueObject';
import { Order } from '../../domain/Order';
import { OrderCreateStatusDiffReceived } from '../../domain/exception/OrderCreateStatusDiffReceived';

type Params = {
  orderId: OrderId;
  orderStatus: OrderStatus;
  orderCustomer: OrderCustomer;
};

@Injectable()
export class OrderCreated implements UseCases<Params> {
  constructor(private repository: OrderRepository) {}

  async run({ orderId, orderStatus, orderCustomer }: Params): Promise<void> {
    this.ensureOrderStatusIsReceived(orderStatus);

    const order = Order.create(orderId, orderStatus, orderCustomer);

    return this.repository.persist(order);
  }

  private ensureOrderStatusIsReceived(orderStatus: OrderStatus): void {
    if (orderStatus.value !== StatusOrderAvailable.RECEIVED) {
      throw new OrderCreateStatusDiffReceived(
        `<${this.constructor.name}> It is not allowed to create an order with a status other than received`,
      );
    }
  }
}
