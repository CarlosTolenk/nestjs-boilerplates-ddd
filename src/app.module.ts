import { Module } from '@nestjs/common';

// Contexts
import { HealthModule } from './Context/Health/healthModule';
import { OrderModule } from './Context/Order/order.module';

@Module({
  imports: [HealthModule, OrderModule],
  exports: [HealthModule, OrderModule],
})
export class AppModule {}
