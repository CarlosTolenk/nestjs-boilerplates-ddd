import { OrderCreatedDto } from '../../../../src/Context/Order/interfaces/controller/dtos/order-created.dto';

export class MotherOrder {
  static createOrderRequest(): OrderCreatedDto {
    return {
      id: '60169eca-03f9-46bd-a2e2-699487cea423',
      shippingGroups: [
        {
          productName: 'the real product',
          price: 150.45,
        },
      ],
      customer: { name: 'Carlos', lastName: 'Tolentino' },
    };
  }

  static createOrderRequestWithErrors(): Partial<OrderCreatedDto> {
    return {
      id: '60169eca-03f9-46bd-a2e2-699487cea423',
      customer: { name: 'Carlos', lastName: 'Tolentino' },
    };
  }
}
