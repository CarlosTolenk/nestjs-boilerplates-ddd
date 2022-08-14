import { Test, TestingModule } from '@nestjs/testing';
import { TerminusModule } from '@nestjs/terminus';

import { HealthController } from '../../../../src/Context/Health/interfaces/health.controller';
import { HealthService } from '../../../../src/Context/Health/application/health.service';
import { HealthRepository } from '../../../../src/Context/Health/domain/health.repositoryts';
import { Health } from '../../../../src/Context/Health/domain/health';

import { HealthRepositoryMock } from '../../../__Mocks__/Health/HealthRepositoryMock';

describe('HealthController', () => {
  let healthController: HealthController;
  let healthService: HealthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      controllers: [HealthController],
      providers: [
        HealthService,
        {
          provide: HealthRepository,
          useClass: HealthRepositoryMock,
        },
      ],
    }).compile();

    healthController = app.get<HealthController>(HealthController);
    healthService = app.get<HealthService>(HealthService);
  });

  describe('checkLiveness', () => {
    it('should return object check health', async () => {
      const expected = { details: {}, error: {}, info: {}, status: 'ok' };
      healthService.checkLiveness = jest
        .fn()
        .mockResolvedValue(new Health('up'));

      const result = await healthController.checkLiveness();

      expect(result).toEqual(expected);
    });

    it('should return error check health', async () => {
      const expected = new Error('error');
      healthService.checkLiveness = jest
        .fn()
        .mockRejectedValue(new Error('error'));

      const result = await healthController.checkLiveness();

      expect(result).toEqual(expected);
    });
  });

  describe('checkReadiness', () => {
    it('should return object check health', async () => {
      const expected = {
        details: { status: 'up' },
        error: {},
        info: { status: 'up' },
        status: 'ok',
      };
      healthService.checkReadiness = jest
        .fn()
        .mockResolvedValue(new Health('up'));

      const result = await healthController.checkReadiness();

      expect(result).toEqual(expected);
    });

    it('should return error check health', async () => {
      const expected = new Error('error');
      healthService.checkReadiness = jest
        .fn()
        .mockRejectedValue(new Error('error'));

      const result = await healthController.checkReadiness();

      expect(result).toEqual(expected);
    });
  });
});
