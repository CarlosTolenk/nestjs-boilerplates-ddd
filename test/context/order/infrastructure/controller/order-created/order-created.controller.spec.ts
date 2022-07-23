import { Test, TestingModule } from '@nestjs/testing';
import { Response } from 'express';
import { CqrsModule } from '@nestjs/cqrs';
import { createResponse, MockResponse } from 'node-mocks-http';

import { OrderCreatedController } from '../../../../../../src/context/order/infrastructure/controller/order-created.controller';
import { MotherOrder } from '../../../../../motherObjects/requests/order-created.request';
import { OrderCreatedCommand } from '../../../../../../src/context/order/application/commands/implements/order-created.command';

describe('OrderCreatedController', () => {
  let controller: OrderCreatedController;
  let response: MockResponse<Response>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      controllers: [OrderCreatedController],
    }).compile();

    controller = module.get<OrderCreatedController>(OrderCreatedController);
    response = createResponse();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create the command and send to the command bus', async () => {
    const orderDTO = MotherOrder.createOrderRequest();
    const orderCreatedCommand = new OrderCreatedCommand(orderDTO);
    const commandBusSpy = jest.spyOn(controller.commandBus, 'execute');

    await controller.orderCreated('id', orderDTO, response);

    expect(commandBusSpy).toHaveBeenCalled();
    expect(commandBusSpy).toHaveBeenCalledWith(orderCreatedCommand);
  });
});
