import { Controller, Get, Param } from '@nestjs/common';

@Controller('order')
export class OrderGetController {
  @Get(':id')
  async getById(@Param('id') id: string): Promise<any> {
    return null;
  }
}
