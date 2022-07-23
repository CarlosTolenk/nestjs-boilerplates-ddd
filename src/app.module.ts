import { Module } from '@nestjs/common';

// Contexts
import { HelloModule } from './context/hello/hello.module';
import { OrderModule } from './context/order/order.module';

@Module({
  imports: [HelloModule, OrderModule],
  exports: [HelloModule, OrderModule],
})
export class AppModule {}
