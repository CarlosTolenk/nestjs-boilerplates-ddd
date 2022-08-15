import { OrderCreatedDto } from '../../../../src/Context/Order/interfaces/controller/dtos/order-created.dto';
import {
  OrderCustomer,
  OrderId,
  OrderStatus,
  StatusOrderAvailable,
} from '../../../../src/Context/Order/domain/valueObject';
import { OrderCreatedCommand } from '../../../../src/Context/Order/application/commands/implements';

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
      customer: {
        name: 'Carlos',
        lastName: 'Tolentino',
        phoneNumber: '809-xxx-5656',
      },
    };
  }

  static createOrderRequestWithUUIInvalid(): OrderCreatedDto {
    return {
      id: 'invalid',
      shippingGroups: [
        {
          productName: 'the real product',
          price: 150.45,
        },
      ],
      customer: {
        name: 'Carlos',
        lastName: 'Tolentino',
        phoneNumber: '809-xxx-5656',
      },
    };
  }

  static createOrderRequestWithNameInvalid(): OrderCreatedDto {
    return {
      id: '60169eca-03f9-46bd-a2e2-699487cea423',
      shippingGroups: [
        {
          productName: 'the real product',
          price: 150.45,
        },
      ],
      customer: {
        name: '',
        lastName: 'Tolentino',
        phoneNumber: '809-xxx-5656',
      },
    };
  }

  static createOrderRequestWithErrors(): Partial<OrderCreatedDto> {
    return {
      id: '60169eca-03f9-46bd-a2e2-699487cea423',
      customer: {
        name: 'Carlos',
        lastName: 'Tolentino',
        phoneNumber: '809-xxx-5656',
      },
    };
  }

  static createOrderValueObjectFromDTO(command: OrderCreatedCommand): any {
    const orderId = new OrderId(command.orderId);
    const orderStatus = new OrderStatus(StatusOrderAvailable.RECEIVED);
    const orderCustomer = new OrderCustomer(
      command.customer.name,
      command.customer.lastName,
      command.customer.phoneNumber,
    );

    return { orderId, orderStatus, orderCustomer };
  }
}
