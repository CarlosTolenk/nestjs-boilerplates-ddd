import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Handlers
import { CommandHandlers } from './application/commands/handlers';

// UseCase
import { OrderCreated } from './application/useCase';

// Controllers
import { OrderCreatedController } from './interfaces/controller';
import { OrderRepository } from './domain/Order.repository';
import { OrderPostgresRepository } from './infrastructure/repository/order-postgres.repository';

@Module({
  imports: [CqrsModule],
  controllers: [OrderCreatedController],
  providers: [
    OrderCreated,
    ...CommandHandlers,
    {
      provide: OrderRepository,
      useClass: OrderPostgresRepository,
    },
  ],
})
export class OrderModule {}
