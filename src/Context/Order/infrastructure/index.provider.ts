import { Provider } from '@nestjs/common';

// Domains
import { OrderRepository } from '../domain/Order.repository';

// Infrastructures
import { OrderPostgresRepository } from './repository/order-postgres.repository';

export const infrastructures: Provider[] = [
  {
    provide: OrderRepository,
    useClass: OrderPostgresRepository,
  },
];
