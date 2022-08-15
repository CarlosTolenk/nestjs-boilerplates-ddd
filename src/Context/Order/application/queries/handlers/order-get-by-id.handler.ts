import { IQueryHandler, IQueryResult, QueryHandler } from '@nestjs/cqrs';
import { OrderGetByIdQuery } from '../implements/order-get-by-id.query';

export class FindOrderByIdResult implements IQueryResult {
  readonly id: string = '';
  readonly status: string = '';
}

@QueryHandler(OrderGetByIdQuery)
export class OrderGetByIdHandler
  implements IQueryHandler<OrderGetByIdQuery, FindOrderByIdResult>
{
  execute(query: OrderGetByIdQuery): Promise<FindOrderByIdResult> {
    return Promise.resolve(undefined);
  }
}
