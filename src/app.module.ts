import { Module } from '@nestjs/common';

// Contexts
import { HealthModule } from './Context/Health/healthModule';
import { OrderModule } from './Context/Order/order.module';
import { AppService } from './app.service';

@Module({
  imports: [HealthModule, OrderModule],
  providers: [AppService],
})
export class AppModule {}
