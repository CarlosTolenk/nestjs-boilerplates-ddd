import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { OrderGetById } from '../../../../../src/Context/Order/application/useCase';
import { OrderRepository } from '../../../../../src/Context/Order/domain/Order.repository';
import { OrderRepositoryMock } from '../../../../__Mocks__/Order/OrderRepositoryMock';
import { OrderEntity } from '../../../../../src/Context/Order/infrastructure/entity/order.entity';

describe('OrderGetById', () => {
  let service: OrderGetById;
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
      OrderGetById,
      repositoryProvider,
      repositoryTypeORM,
    ];

    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    service = testModule.get<OrderGetById>(OrderGetById);
    repository = testModule.get<OrderRepository>(OrderRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('run', () => {
    it('should execute method run correctly', async () => {
      repository.findById = jest.fn().mockResolvedValue(Promise.resolve());
    });
  });
});
