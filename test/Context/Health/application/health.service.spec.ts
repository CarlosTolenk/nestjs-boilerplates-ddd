import { Test, TestingModule } from '@nestjs/testing';
import { TerminusModule } from '@nestjs/terminus';

import { Health } from '../../../../src/Context/Health/domain/health';
import { HealthService } from '../../../../src/Context/Health/application/health.service';
import { HealthRepository } from '../../../../src/Context/Health/domain/health.repositoryts';

import { HealthRepositoryMock } from '../../../__Mocks__/Health/HealthRepositoryMock';

describe('HealthService', () => {
  let healthService: HealthService;
  let healthRepository: HealthRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule],
      providers: [
        HealthService,
        {
          provide: HealthRepository,
          useClass: HealthRepositoryMock,
        },
      ],
    }).compile();

    healthService = app.get<HealthService>(HealthService);
    healthRepository = app.get<HealthRepository>(HealthRepository);
  });

  describe('checkReadiness', () => {
    it('should return that the database is up', async () => {
      const expected = { database: { status: 'up' } };
      healthRepository.check = jest
        .fn()
        .mockResolvedValueOnce(new Health('up'));

      const result = await healthService.checkReadiness();

      expect(result).toEqual(expected);
    });

    it('should return that the database is down', async () => {
      const expected = { database: { status: 'down' } };
      healthRepository.check = jest
        .fn()
        .mockResolvedValueOnce(new Health('down'));

      const result = await healthService.checkReadiness();

      expect(result).toEqual(expected);
    });
  });

  describe('checkLiveness', () => {
    it('should return that the artefact up', async () => {
      const expected = { status: 'up' };
      const result = await healthService.checkLiveness();

      expect(result).toEqual(expected);
    });
  });
});
