import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';

import { MotherOrder } from '../../__Mocks__/MotherObjects/requests/order-created.request';

import { OrderEntity } from '../../../src/Context/Order/infrastructure/entity/order.entity';
import { AppModule } from '../../../src/app.module';

describe('Order Created e2e', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
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
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/(PUT) should create an order successfully ', () => {
    const orderDTO = MotherOrder.createOrderRequest();

    return request(app.getHttpServer())
      .put('/order/60169eca-03f9-46bd-a2e2-699487cea423')
      .send(orderDTO)
      .expect(HttpStatus.CREATED);
  });

  it('/(PUT) should show a bad request when the data is not sent correctly', () => {
    const orderDTO = MotherOrder.createOrderRequestWithErrors();

    return request(app.getHttpServer())
      .put('/order/60169eca-03f9-46bd-a2e2-699487cea423')
      .send(orderDTO)
      .expect(HttpStatus.BAD_REQUEST);
  });
});
