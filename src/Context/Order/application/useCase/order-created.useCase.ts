import { Injectable } from '@nestjs/common';
import { UseCases } from '../../../Common/application';

import { OrderRepository } from '../../domain/Order.repository';
import { OrderCustomer, OrderId, OrderStatus } from '../../domain/valueObject';
import { Order } from '../../domain/Order';

type Params = {
  orderId: OrderId;
  orderStatus: OrderStatus;
  orderCustomer: OrderCustomer;
};

@Injectable()
export class OrderCreated implements UseCases<Params> {
  constructor(private repository: OrderRepository) {}

  async run({ orderId, orderStatus, orderCustomer }: Params): Promise<void> {
    const order = Order.create(orderId, orderStatus, orderCustomer);

    return this.repository.persist(order);
  }
}
