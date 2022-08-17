import { Controller, Get, HttpStatus, Param, Res } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';

import { OrderGetByIdQuery } from '../../application/queries/implements/order-get-by-id.query';
import { Response } from 'express';

@Controller('order')
export class OrderGetController {
  constructor(public readonly queryBus: QueryBus) {}
  @Get(':id')
  async getById(
    @Param('id') id: string,
    @Res() response: Response,
  ): Promise<any> {
    try {
      const query = new OrderGetByIdQuery(id);

      const result = await this.queryBus.execute(query);

      return response.status(HttpStatus.OK).end(result);
    } catch (error) {
      return response.status(error.status).json(error);
    }
  }
}
