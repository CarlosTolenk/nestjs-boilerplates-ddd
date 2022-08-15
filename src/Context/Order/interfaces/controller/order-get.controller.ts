import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { OrderGetByIdQuery } from '../../application/queries/implements/order-get-by-id.query';

@Controller('order')
export class OrderGetController {
  constructor(public readonly queryBus: QueryBus) {}
  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    const query = new OrderGetByIdQuery(id);

    return this.queryBus.execute(query);
  }
}
