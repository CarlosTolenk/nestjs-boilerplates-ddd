import { Module } from '@nestjs/common';
import { OrderCreatedController } from './infrastructure/controller/order-created.controller';

@Module({
  imports: [],
  controllers: [OrderCreatedController],
  providers: [],
})
export class OrderModule {}
