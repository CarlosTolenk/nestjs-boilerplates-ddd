import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { MotherOrder } from '../../../../../__Mocks__/MotherObjects/requests/order-created.request';

import { OrderCreatedHandler } from '../../../../../../src/Context/Order/application/commands/handlers/order-created.handler';
import { OrderCreated } from '../../../../../../src/Context/Order/application/useCase';
import { OrderRepository } from '../../../../../../src/Context/Order/domain/Order.repository';
import { OrderPostgresRepository } from '../../../../../../src/Context/Order/infrastructure/repository/order-postgres.repository';
import { OrderCreatedCommand } from '../../../../../../src/Context/Order/application/commands/implements';
import { InvalidArgumentError } from '../../../../../../src/Context/Common/domain/exception';

describe('OrderCreatedHandler', () => {
  let handler: OrderCreatedHandler;
  let service: OrderCreated;

  beforeEach(async () => {
    const repositoryProvider: Provider = {
      provide: OrderRepository,
      useClass: OrderPostgresRepository,
    };
    const providers: Provider[] = [
      OrderCreatedHandler,
      OrderCreated,
      repositoryProvider,
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get<OrderCreatedHandler>(OrderCreatedHandler);
    service = testModule.get<OrderCreated>(OrderCreated);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should execute OrderCreatedCommand correctly', async () => {
      service.run = jest.fn().mockResolvedValue(Promise.resolve());
      const command = new OrderCreatedCommand(MotherOrder.createOrderRequest());

      await expect(handler.execute(command)).resolves.toEqual(undefined);
      expect(service.run).toBeCalledTimes(1);
      expect(service.run).toHaveBeenCalledWith(
        MotherOrder.createOrderValueObjectFromDTO(command),
      );
    });

    it('should execute OrderCreatedCommand wrong when orderId is not UUID valid', async () => {
      service.run = jest.fn().mockResolvedValue(Promise.resolve());
      const command = new OrderCreatedCommand(
        MotherOrder.createOrderRequestWithUUIInvalid(),
      );

      await expect(handler.execute(command)).rejects.toEqual(
        new InvalidArgumentError(
          `<OrderId> does not allow the value <${command.orderId}>`,
        ),
      );
    });
  });
});
