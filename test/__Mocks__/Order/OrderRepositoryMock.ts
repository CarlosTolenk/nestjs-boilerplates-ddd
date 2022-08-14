import { OrderRepository } from '../../../src/Context/Order/domain/Order.repository';
import { Order } from '../../../src/Context/Order/domain/Order';

export class OrderRepositoryMock extends OrderRepository {
  persist(model: Order): Promise<void> {
    return Promise.resolve(undefined);
  }
  findById(id: string): Promise<Order | null> {
    return Promise.resolve(null);
  }
}
