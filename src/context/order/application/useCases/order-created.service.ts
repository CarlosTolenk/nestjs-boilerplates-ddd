import { Injectable } from '@nestjs/common';
import { UseCases } from '../../../common/interfaces';

@Injectable()
export class OrderCreatedService implements UseCases<unknown> {
  run(valueObject: unknown): Promise<void> {
    return Promise.resolve(undefined);
  }
}
