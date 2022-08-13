import { Injectable } from '@nestjs/common';
import { UseCases } from '../../../Common/interfaces';

@Injectable()
export class OrderCreated implements UseCases<number> {
  run(valueObject: number): Promise<string> {
    return Promise.resolve(undefined);
  }
}
