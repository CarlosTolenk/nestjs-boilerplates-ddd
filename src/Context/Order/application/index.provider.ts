import { Provider } from '@nestjs/common';

// Command Handlers
import { OrderCreatedHandler } from './commands/handlers/order-created.handler';

// Query Handlers
import { OrderGetByIdHandler } from './queries/handlers/order-get-by-id.handler';

// Use Cases
import { OrderCreated, OrderGetById } from './useCase';

const CommandHandlers = [OrderCreatedHandler, OrderGetByIdHandler];
const UseCases = [OrderGetById, OrderCreated];

export const applications: Provider[] = [...UseCases, ...CommandHandlers];
