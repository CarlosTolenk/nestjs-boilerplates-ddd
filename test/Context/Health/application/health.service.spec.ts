import { Test, TestingModule } from '@nestjs/testing';
import { TerminusModule } from '@nestjs/terminus';

import { HealthService } from '../../../../src/Context/Health/application/health.service';
import { HealthRepository } from '../../../../src/Context/Health/domain/health.repositoryts';

import { HealthRepositoryMock } from '../../../__Mocks__/Health/HealthRepositoryMock';

describe('HealthService', () => {
  let healthService: HealthService;

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
  });

  describe('checkLiveness', () => {
    it('should', () => {
      expect(true).toEqual(true);
    });
  });

  describe('checkReadiness', () => {
    it('should', () => {
      expect(true).toEqual(true);
    });
  });
});
