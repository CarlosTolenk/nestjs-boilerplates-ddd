import { Test } from '@nestjs/testing';
import { ModuleMetadata, Provider } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';

import { OrderGetByIdHandler } from '../../../../../../src/Context/Order/application/queries/handlers/order-get-by-id.handler';
import { OrderRepository } from '../../../../../../src/Context/Order/domain/Order.repository';
import { OrderPostgresRepository } from '../../../../../../src/Context/Order/infrastructure/repository/order-postgres.repository';
import { OrderEntity } from '../../../../../../src/Context/Order/infrastructure/entity/order.entity';
import { OrderGetById } from '../../../../../../src/Context/Order/application/useCase';
import { OrderGetByIdQuery } from '../../../../../../src/Context/Order/application/queries/implements/order-get-by-id.query';
import { NotFoundOrderById } from '../../../../../../src/Context/Order/domain/exception';
import { Uuid } from '../../../../../../src/Context/Common/domain/valueObject/Uuid';
import { OrderId } from '../../../../../../src/Context/Order/domain/valueObject';
import { InvalidArgumentError } from '../../../../../../src/Context/Common/domain/exception';

describe('OrderGetByIdHandler', () => {
  let handler: OrderGetByIdHandler;
  let service: OrderGetById;

  beforeEach(async () => {
    const repositoryProvider: Provider = {
      provide: OrderRepository,
      useClass: OrderPostgresRepository,
    };
    const repositoryTypeORM: Provider = {
      provide: getRepositoryToken(OrderEntity),
      useValue: {},
    };
    const providers: Provider[] = [
      OrderGetByIdHandler,
      OrderGetById,
      repositoryProvider,
      repositoryTypeORM,
    ];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    handler = testModule.get<OrderGetByIdHandler>(OrderGetByIdHandler);
    service = testModule.get<OrderGetById>(OrderGetById);
  });

  it('should be defined', () => {
    expect(handler).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('execute', () => {
    it('should execute the query OrderGetById correctly and return a orderResult', async () => {
      const expected = {
        id: 'id',
        status: 'status',
      };
      service.run = jest.fn().mockResolvedValue(Promise.resolve(expected));
      const orderId = new OrderId(Uuid.random().value);
      const query = new OrderGetByIdQuery(orderId.value);

      const result = await handler.execute(query);

      expect(result).toEqual(expected);
      expect(service.run).toBeCalledTimes(1);
      expect(service.run).toHaveBeenCalledWith(orderId);
    });

    it('should execute the query OrderGetById correctly and return a exception', async () => {
      const expected = new NotFoundOrderById('OrderId not exist');
      service.run = jest.fn().mockResolvedValue(Promise.reject(expected));
      const orderId = new OrderId(Uuid.random().value);
      const query = new OrderGetByIdQuery(orderId.value);

      await expect(handler.execute(query)).rejects.toThrowError(expected);
    });

    it('should execute the query OrderGetById correctly and return a exception UUID invalid', async () => {
      const orderId = 'invalid-uuid';
      const query = new OrderGetByIdQuery(orderId);

      await expect(handler.execute(query)).rejects.toThrowError(
        new InvalidArgumentError(
          `<OrderId> does not allow the value <${orderId}>`,
        ),
      );
    });
  });
});
