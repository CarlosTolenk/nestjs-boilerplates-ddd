import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';
import { createResponse, MockResponse } from 'node-mocks-http';
import { Response } from 'express';

import { OrderGetController } from '../../../../../src/Context/Order/interfaces/controller';
import { OrderGetByIdQuery } from '../../../../../src/Context/Order/application/queries/implements/order-get-by-id.query';
import { Uuid } from '../../../../../src/Context/Common/domain/valueObject/Uuid';

describe('OrderGetController', () => {
  let controller: OrderGetController;
  let response: MockResponse<Response>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [OrderGetController],
    }).compile();

    await module.init();

    controller = module.get<OrderGetController>(OrderGetController);
    response = createResponse();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a domain error when the order with that id does not exist', async () => {
    const paramId = Uuid.random();
    const queryBusSpy = jest.spyOn(controller.queryBus, 'execute');
    const orderGetByIdQuery = new OrderGetByIdQuery(paramId.value);

    await controller.getById(paramId.value, response);

    expect(queryBusSpy).toHaveBeenCalled();
    expect(queryBusSpy).toHaveBeenCalledWith(orderGetByIdQuery);
  });
});
