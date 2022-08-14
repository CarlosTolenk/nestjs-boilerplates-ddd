import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Domain
import { OrderRepository } from '../../domain/Order.repository';
import { Order } from '../../domain/Order';

// Infrastructure
import { OrderEntity } from '../entity/order.entity';

type Primitives = {
  orderId: string;
  orderStatus: string;
  orderCustomer: { name: string; lastName: string; phoneNumber: string };
};

export class OrderPostgresRepository extends OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repository: Repository<OrderEntity>,
  ) {
    super();
  }

  async persist(order: Order): Promise<void> {
    const entity = order.toPrimitives();
    await this.repository.save(entity);
  }

  async findById(orderId: string): Promise<Order | null> {
    const entity = await this.repository.findOneById(orderId);
    const entityToPrimitives = this.entityToPrimitives(entity);
    const order = Order.fromPrimitives(entityToPrimitives);
    return entity ? order : null;
  }

  private entityToPrimitives(orderEntity: OrderEntity): Primitives {
    return {
      orderId: orderEntity.id,
      orderStatus: orderEntity.status,
      orderCustomer: {
        name: orderEntity.customer.name,
        lastName: orderEntity.customer.lastName,
        phoneNumber: orderEntity.customer.phoneNumber,
      },
    };
  }
}
