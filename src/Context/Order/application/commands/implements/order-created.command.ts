import {
  CustomerDto,
  OrderCreatedDto,
  ShippingGroupsDto,
} from '../../../infrastructure/interfaces/controller/dtos/order-created.dto';

export class OrderCreatedCommand {
  readonly orderId: string;
  readonly shippingGroups: ShippingGroupsDto[];
  readonly customer: CustomerDto;

  constructor(public readonly orderCreateRequest: OrderCreatedDto) {
    this.orderId = orderCreateRequest.id;
    this.shippingGroups = orderCreateRequest.shippingGroups;
    this.customer = orderCreateRequest.customer;
  }
}
