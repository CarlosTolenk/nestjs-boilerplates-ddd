import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { OrderCreatedCommand } from '../implements';
import { OrderCreated } from '../../useCase';
import {
  OrderCustomer,
  OrderId,
  OrderStatus,
  StatusOrderAvailable,
} from '../../../domain/valueObject';

@CommandHandler(OrderCreatedCommand)
export class OrderCreatedHandler
  implements ICommandHandler<OrderCreatedCommand>
{
  constructor(private readonly service: OrderCreated) {}

  async execute(command: OrderCreatedCommand): Promise<void> {
    try {
      await this.service.run(this.createValueObjectOrder(command));

      return Promise.resolve();
    } catch (error) {
      throw error;
    }
  }

  private createValueObjectOrder(command: OrderCreatedCommand) {
    const orderId = new OrderId(command.orderId);
    const orderStatus = new OrderStatus(StatusOrderAvailable.RECEIVED);
    const orderCustomer = new OrderCustomer(
      command.customer.name,
      command.customer.lastName,
      command.customer.phoneNumber,
    );

    return { orderId, orderStatus, orderCustomer };
  }
}
