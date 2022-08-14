import { Provider } from '@nestjs/common';

// Handlers
import { OrderCreatedHandler } from './commands/handlers/order-created.handler';

// Use Cases
import { OrderCreated } from './useCase';

const CommandHandlers = [OrderCreatedHandler];

export const applications: Provider[] = [OrderCreated, ...CommandHandlers];
