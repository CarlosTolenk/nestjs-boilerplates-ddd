import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { MotherOrder } from '../../motherObjects/requests/order-created.request';

describe('Order Created e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
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
