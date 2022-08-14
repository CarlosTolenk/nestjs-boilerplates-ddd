import { OrderRepository } from '../../domain/Order.repository';
import { Order } from '../../domain/Order';
import { getRepository } from 'typeorm';
import { OrderEntity } from '../entity/order.entity';

export class OrderPostgresRepository extends OrderRepository {
  async persist(order: Order): Promise<void> {
    const entity = order.toPrimitives();
    await getRepository(OrderEntity).save(entity);
  }
}
