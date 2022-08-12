import { Module } from '@nestjs/common';

// Contexts
import { HelloModule } from './Context/hello/hello.module';
import { OrderModule } from './Context/Order/order.module';

@Module({
  imports: [HelloModule, OrderModule],
  exports: [HelloModule, OrderModule],
})
export class AppModule {}
