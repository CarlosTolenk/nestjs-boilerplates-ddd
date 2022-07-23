import { Body, Controller, HttpStatus, Param, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { OrderCreatedDto } from './dto/order-created.dto';

@Controller('order')
export class OrderCreatedController {
  constructor() {}

  @Put(':id')
  async orderCreated(
    @Param('id') id: string,
    @Body() orderCreatedDto: OrderCreatedDto,
    @Res() response: Response,
  ): Promise<Response> {
    return response.status(HttpStatus.CREATED).end();
  }
}
