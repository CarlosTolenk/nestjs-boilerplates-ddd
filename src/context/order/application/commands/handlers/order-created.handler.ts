import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderCreatedCommand } from '../implements/order-created.command';

@CommandHandler(OrderCreatedCommand)
export class OrderCreatedHandler
  implements ICommandHandler<OrderCreatedCommand>
{
  execute(command: OrderCreatedCommand): Promise<void> {
    console.log('OrderCreatedHandler');
    return Promise.resolve(undefined);
  }
}
