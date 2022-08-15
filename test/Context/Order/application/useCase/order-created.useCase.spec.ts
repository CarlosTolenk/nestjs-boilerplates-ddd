import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { OrderRepositoryMock } from '../../../../__Mocks__/Order/OrderRepositoryMock';
import { MotherOrder } from '../../../../__Mocks__/MotherObjects/requests/order-created.request';

import { OrderRepository } from '../../../../../src/Context/Order/domain/Order.repository';
import { OrderCreated } from '../../../../../src/Context/Order/application/useCase';
import { OrderCreatedCommand } from '../../../../../src/Context/Order/application/commands/implements';
import { OrderEntity } from '../../../../../src/Context/Order/infrastructure/entity/order.entity';
import { InvalidArgumentError } from '../../../../../src/Context/Common/domain/exception';

describe('OrderCreated', () => {
  let service: OrderCreated;
  let repository: OrderRepository;

  beforeEach(async () => {
    const repositoryProvider: Provider = {
      provide: OrderRepository,
      useClass: OrderRepositoryMock,
    };
    const repositoryTypeORM: Provider = {
      provide: getRepositoryToken(OrderEntity),
      useValue: {},
    };
    const providers: Provider[] = [
      OrderCreated,
      repositoryProvider,
      repositoryTypeORM,
    ];

    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    service = testModule.get<OrderCreated>(OrderCreated);
    repository = testModule.get<OrderRepository>(OrderRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('run', () => {
    it('should execute method run correctly', async () => {
      repository.persist = jest.fn().mockResolvedValue(Promise.resolve());
      const command = new OrderCreatedCommand(MotherOrder.createOrderRequest());
      const { orderId, orderStatus, orderCustomer } =
        MotherOrder.createOrderValueObjectFromDTO(command);

      await service.run({ orderId, orderStatus, orderCustomer });

      expect(repository.persist).toBeCalledTimes(1);
      expect(repository.persist).toHaveReturnedWith(Promise.resolve());
    });

    it('should throw error method when OrderStatus is invalid', async () => {
      repository.persist = jest.fn().mockResolvedValue(Promise.resolve());
      const command = new OrderCreatedCommand(MotherOrder.createOrderRequest());
      const { orderId, orderStatus, orderCustomer } =
        MotherOrder.createOrderValueObjectFromDTOWithErrorStatus(command);

      await expect(
        service.run({ orderId, orderStatus, orderCustomer }),
      ).rejects.toEqual(
        new InvalidArgumentError(
          `<OrderCreated> It is not allowed to create an order with a status other than received`,
        ),
      );
    });
  });
});
