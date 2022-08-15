import { IQuery } from '@nestjs/cqrs';

export class OrderGetByIdQuery implements IQuery {
  constructor(readonly id: string) {}
}
