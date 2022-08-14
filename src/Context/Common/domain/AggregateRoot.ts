import { AggregateRoot } from '@nestjs/cqrs';

export class AggregateDomainRoot extends AggregateRoot {
  record(event: any): void {
    this.apply(event);
  }
}
