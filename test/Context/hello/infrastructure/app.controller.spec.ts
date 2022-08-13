import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from '../../../../src/Context/Health/interfaces/healthController';
import { HealthService } from '../../../../src/Context/Health/application/health.service';

describe('AppController', () => {
  let appController: HealthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    appController = app.get<HealthController>(HealthController);
  });

  describe('root', () => {
    it('should return "Health World!"', () => {
      expect(appController.getHello()).toBe('Health World!');
    });
  });
});
