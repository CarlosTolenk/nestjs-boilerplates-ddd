import { Body, Controller, HttpStatus, Param, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CommandBus } from '@nestjs/cqrs';

import { OrderCreatedDto } from './dtos/order-created.dto';
import { OrderCreatedCommand } from '../../application/commands/implements';

@Controller('order')
export class OrderCreatedController {
  constructor(public readonly commandBus: CommandBus) {}

  @Put(':id')
  async orderCreated(
    @Param('id') id: string,
    @Body() orderCreatedDto: OrderCreatedDto,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const command = new OrderCreatedCommand(orderCreatedDto);
      await this.commandBus.execute(command);
      return response.status(HttpStatus.CREATED).end();
    } catch (error) {
      return response.status(error.status).json(error);
    }
  }
}
