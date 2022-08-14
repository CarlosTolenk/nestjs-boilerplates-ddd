import { IPersistenceRepository } from '../../Common/domain/repository';
import { Order } from './Order';

export abstract class OrderRepository implements IPersistenceRepository<Order> {
  abstract persist(model: Order): Promise<void>;
}
