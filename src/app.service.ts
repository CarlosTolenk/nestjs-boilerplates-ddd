import { OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Connection, createConnection } from 'typeorm';

// Entities
import { HealthEntity } from './Context/Health/infrastructure/entity/health.entity';
import { OrderEntity } from './Context/Order/infrastructure/entity/order.entity';

interface DBConfig {
  readonly host: string;
  readonly port: number;
  readonly database: string;
  readonly username: string;
  readonly password: string;
  readonly synchronize: boolean;
  readonly logging: boolean;
}

export class AppService {
  private databaseConnection?: Connection | void;

  static port(): number {
    const { PORT } = process.env;
    return PORT && Number(PORT) ? Number(PORT) : 3000;
  }

  // async onModuleInit(): Promise<void> {
  //   const entities = [HealthEntity, OrderEntity];
  //
  //   this.databaseConnection = await createConnection({
  //     ...this.loadDBConfig(),
  //     type: 'postgres',
  //     entities,
  //   }).catch((error: Error) => this.failToConnectDatabase(error));
  // }

  // private loadDBConfig(): DBConfig {
  //   return {
  //     host: process.env.DATABASE_HOST || 'localhost',
  //     port: parseInt(process.env.DATABASE_PORT ?? '54321', 10) || 54321,
  //     database: process.env.DATABASE_NAME || 'picking',
  //     username: process.env.DATABASE_USER || 'postgres',
  //     password: process.env.DATABASE_PASSWORD || 'postgres',
  //     synchronize: 'true' === process.env.DATABASE_SYNC || true,
  //     logging: 'true' === process.env.DATABASE_LOGGING || false,
  //   };
  // }

  // private failToConnectDatabase(error: Error): void {
  //   console.error(error);
  //   process.exit(1);
  // }
  //
  // async onModuleDestroy(): Promise<void> {
  //   if (this.databaseConnection) await this.databaseConnection.close();
  // }
}
