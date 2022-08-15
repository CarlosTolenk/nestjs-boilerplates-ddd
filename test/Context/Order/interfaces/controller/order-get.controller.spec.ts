import { Test, TestingModule } from '@nestjs/testing';
import { CqrsModule } from '@nestjs/cqrs';

import { OrderGetController } from '../../../../../src/Context/Order/interfaces/controller';
import { OrderGetByIdQuery } from '../../../../../src/Context/Order/application/queries/implements/order-get-by-id.query';
import { OrderGetByIdHandler } from '../../../../../src/Context/Order/application/queries/handlers/order-get-by-id.handler';

describe('OrderGetController', () => {
  let controller: OrderGetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CqrsModule],
      providers: [OrderGetByIdHandler],
      controllers: [OrderGetController],
    }).compile();

    await module.init();

    controller = module.get<OrderGetController>(OrderGetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return a domain error when the order with that id does not exist', async () => {
    const paramId = 'uuid-valid';
    const queryBusSpy = jest.spyOn(controller.queryBus, 'execute');
    const orderGetByIdQuery = new OrderGetByIdQuery(paramId);

    await controller.getById(paramId);

    expect(queryBusSpy).toHaveBeenCalled();
    expect(queryBusSpy).toHaveBeenCalledWith(orderGetByIdQuery);
  });
});
