import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Handlers
import { CommandHandlers } from './application/commands/handlers';

// Controllers
import { OrderCreatedController } from './interfaces/controller/order-created.controller';

@Module({
  imports: [CqrsModule],
  controllers: [OrderCreatedController],
  providers: [...CommandHandlers],
})
export class OrderModule {}
