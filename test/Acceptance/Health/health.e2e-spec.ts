import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';
import { AppModule } from '../../../src/app.module';
import { OrderEntity } from '../../../src/Context/Order/infrastructure/entity/order.entity';

describe('HealthController (e2e)', () => {
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
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/liveness (GET)', () => {
    return request(app.getHttpServer())
      .get('/liveness')
      .expect(200)
      .expect({ status: 'ok', info: {}, error: {}, details: {} });
  });

  it('/readiness (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect({
        status: 'ok',
        info: { database: { status: 'up' } },
        error: {},
        details: { database: { status: 'up' } },
      });
  });
});
