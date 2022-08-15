import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';

// Controllers
import {
  OrderCreatedController,
  OrderGetController,
} from './interfaces/controller';

// Infrastructures
import { infrastructures } from './infrastructure/index.provider';
import { OrderEntity } from './infrastructure/entity/order.entity';

// Applications
import { applications } from './application/index.provider';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([OrderEntity])],
  controllers: [OrderCreatedController, OrderGetController],
  providers: [...applications, ...infrastructures],
})
export class OrderModule {}
