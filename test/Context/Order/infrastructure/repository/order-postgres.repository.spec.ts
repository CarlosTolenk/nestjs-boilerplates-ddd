import { Test } from '@nestjs/testing';
import { INestApplication, ModuleMetadata, Provider } from '@nestjs/common';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { MotherOrder } from '../../../../__Mocks__/MotherObjects/requests/order-created.request';

import { OrderRepository } from '../../../../../src/Context/Order/domain/Order.repository';
import { OrderEntity } from '../../../../../src/Context/Order/infrastructure/entity/order.entity';

import { OrderPostgresRepository } from '../../../../../src/Context/Order/infrastructure/repository/order-postgres.repository';
import { OrderModule } from '../../../../../src/Context/Order/order.module';
import { OrderCreatedCommand } from '../../../../../src/Context/Order/application/commands/implements';
import { Order } from '../../../../../src/Context/Order/domain/Order';

describe('OrderPostgresRepository', () => {
  let repository: OrderRepository;
  let connection: Repository<OrderEntity>;
  let app: INestApplication;
  const tokenRepository = getRepositoryToken(OrderEntity);

  beforeAll(async () => {
    const repositoryProvider: Provider = {
      provide: OrderRepository,
      useClass: OrderPostgresRepository,
    };
    const repositoryTypeORM: Provider = {
      provide: tokenRepository,
      useValue: {},
    };
    const providers: Provider[] = [repositoryProvider, repositoryTypeORM];
    const importsMock: any[] = [
      OrderModule,
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 54321,
        username: 'postgres',
        password: 'postgres',
        database: 'picking',
        entities: [OrderEntity],
        synchronize: true,
      }),
    ];
    const moduleMetadata: ModuleMetadata = { providers, imports: importsMock };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    app = testModule.createNestApplication();
    repository = testModule.get<OrderRepository>(OrderRepository);
    connection = testModule.get(tokenRepository);
    await app.init();
  });

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should defined', () => {
    expect(repository).toBeDefined();
  });

  describe('persist', () => {
    it('should correctly persist an order', async () => {
      const command = new OrderCreatedCommand(MotherOrder.createOrderRequest());
      const { orderId, orderStatus, orderCustomer } =
        MotherOrder.createOrderValueObjectFromDTO(command);
      const order = Order.create(orderId, orderStatus, orderCustomer);

      await repository.persist(order);
      const result = await repository.findById(order.id.value);

      expect(result.id).toEqual(order.id);
      expect(result.status).toEqual(order.status);
      expect(result.customer).toEqual(order.customer);
    });
  });
});
