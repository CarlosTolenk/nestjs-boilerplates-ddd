import { IQueryHandler, IQueryResult, QueryHandler } from '@nestjs/cqrs';
import { OrderGetByIdQuery } from '../implements/order-get-by-id.query';
import { OrderGetById } from '../../useCase';
import { OrderId } from '../../../domain/valueObject';

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
      const result = await this.service.run(orderId);
      return { id: 'id', status: 'status' };
    } catch (error) {
      throw error;
    }
  }
}
