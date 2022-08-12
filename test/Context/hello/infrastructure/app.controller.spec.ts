import { Test, TestingModule } from '@nestjs/testing';
import { HelloController } from '../../../../src/Context/hello/infrastructure/hello.controller';
import { HelloService } from '../../../../src/Context/hello/application/hello.service';

describe('AppController', () => {
  let appController: HelloController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [HelloService],
    }).compile();

    appController = app.get<HelloController>(HelloController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
