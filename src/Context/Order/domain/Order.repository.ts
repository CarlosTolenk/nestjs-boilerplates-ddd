import {
  IPersistenceRepository,
  IQueryRepository,
} from '../../Common/domain/repository';
import { Order } from './Order';

export abstract class OrderRepository
  implements IPersistenceRepository<Order>, IQueryRepository<Order>
{
  abstract persist(model: Order): Promise<void>;

  abstract findById(id: string): Promise<Order | null>;
}
