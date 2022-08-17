import { Injectable } from '@nestjs/common';
import { UseCases } from '../../../Common/application';
import { OrderRepository } from '../../domain/Order.repository';
import { OrderId } from '../../domain/valueObject';

@Injectable()
export class OrderGetById implements UseCases<OrderId> {
  constructor(private readonly repository: OrderRepository) {}

  run(valueObject: OrderId): Promise<unknown> {
    return Promise.resolve(undefined);
  }
}
