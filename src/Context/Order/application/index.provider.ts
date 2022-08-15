import { Provider } from '@nestjs/common';

// Command Handlers
import { OrderCreatedHandler } from './commands/handlers/order-created.handler';

// Query Handlers
import { OrderGetByIdHandler } from './queries/handlers/order-get-by-id.handler';

// Use Cases
import { OrderCreated } from './useCase';

const CommandHandlers = [OrderCreatedHandler, OrderGetByIdHandler];

export const applications: Provider[] = [OrderCreated, ...CommandHandlers];
