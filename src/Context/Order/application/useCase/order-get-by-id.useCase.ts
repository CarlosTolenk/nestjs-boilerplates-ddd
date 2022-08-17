import { Injectable } from '@nestjs/common';
import { UseCases } from '../../../Common/application';
import { OrderRepository } from '../../domain/Order.repository';
import { NotFoundOrderById } from '../../domain/exception';
import { Order } from '../../domain/Order';
import { OrderId } from '../../domain/valueObject';

@Injectable()
export class OrderGetById implements UseCases<OrderId> {
  constructor(private readonly repository: OrderRepository) {}

  async run(orderId: OrderId): Promise<Order> {
    const order = await this.repository.findById(orderId.value);

    this.ensureOrderExist(order, orderId);

    return order;
  }

  private ensureOrderExist(order: Order | null, orderId: OrderId): void {
    if (!order) {
      throw new NotFoundOrderById(orderId.value);
    }
  }
}
