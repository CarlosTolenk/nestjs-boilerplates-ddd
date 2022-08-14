import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Controllers
import { OrderCreatedController } from './interfaces/controller';

// Infrastructures
import { infrastructures } from './infrastructure/provider';

// Applications
import { applications } from './application/provider';

@Module({
  imports: [CqrsModule],
  controllers: [OrderCreatedController],
  providers: [...applications, ...infrastructures],
})
export class OrderModule {}
