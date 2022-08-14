import { Provider } from '@nestjs/common';

// Handlers
import { CommandHandlers } from './commands/handlers';

// Use Cases
import { OrderCreated } from './useCase';

export const applications: Provider[] = [OrderCreated, ...CommandHandlers];
