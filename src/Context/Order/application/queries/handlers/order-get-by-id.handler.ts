import { IQueryHandler, IQueryResult, QueryHandler } from '@nestjs/cqrs';
import { OrderGetByIdQuery } from '../implements/order-get-by-id.query';
import { OrderGetById } from '../../useCase';
import { OrderId } from '../../../domain/valueObject';
import { Order } from '../../../domain/Order';

export class FindOrderByIdResult implements IQueryResult {
  readonly id: string = '';
  readonly status: string = '';
}

@QueryHandler(OrderGetByIdQuery)
export class OrderGetByIdHandler
  implements IQueryHandler<OrderGetByIdQuery, FindOrderByIdResult>
{
  constructor(private readonly service: OrderGetById) {}

  async execute(query: OrderGetByIdQuery): Promise<FindOrderByIdResult> {
    try {
      const orderId = new OrderId(query.id);
      const order = await this.service.run(orderId);
      return this.domainToQuery(order);
    } catch (error) {
      throw error;
    }
  }

  private domainToQuery(order: Order): FindOrderByIdResult {
    return { id: order.id.value, status: order.status.value };
  }
}
