import { Module } from '@nestjs/common';

// Contexts
import { HealthModule } from './Context/Health/health.module';
import { OrderModule } from './Context/Order/order.module';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    HealthModule,
    OrderModule,
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DATABASE_HOST || 'localhost',
        port: parseInt(process.env.DATABASE_PORT ?? '54321', 10) || 54321,
        database: process.env.DATABASE_NAME || 'picking',
        username: process.env.DATABASE_USER || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'postgres',
        synchronize: 'true' === process.env.DATABASE_SYNC || true,
        logging: 'true' === process.env.DATABASE_LOGGING || false,
      }),
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
