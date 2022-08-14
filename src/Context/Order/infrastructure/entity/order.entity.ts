import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../Common/infrastructure/entity/base.entity';

interface Customer {
  name: string;
  lastName: string;
  phoneNumber: string;
}

@Entity()
export class OrderEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 120 })
  public status: string;

  @Column({ type: 'jsonb' })
  public customer: Customer;
}
