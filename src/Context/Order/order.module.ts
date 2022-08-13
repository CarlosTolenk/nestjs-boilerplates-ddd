import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Handlers
import { CommandHandlers } from './application/commands/handlers';

// UseCase
import { OrderCreated } from './application/useCases';

// Controllers
import { OrderCreatedController } from './interfaces/controller';

@Module({
  imports: [CqrsModule],
  controllers: [OrderCreatedController],
  providers: [OrderCreated, ...CommandHandlers],
})
export class OrderModule {}
