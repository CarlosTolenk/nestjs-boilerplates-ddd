import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderCreatedCommand } from '../implements';

@CommandHandler(OrderCreatedCommand)
export class OrderCreatedHandler
  implements ICommandHandler<OrderCreatedCommand>
{
  execute(command: OrderCreatedCommand): Promise<void> {
    return Promise.resolve(undefined);
  }
}
