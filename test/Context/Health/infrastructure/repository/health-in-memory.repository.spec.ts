import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { HealthRepository } from '../../../../../src/Context/Health/domain/health.repositoryts';
import { HealthInMemoryRepository } from '../../../../../src/Context/Health/infrastructure/repository/health-in-memory.repository';
import { Health } from '../../../../../src/Context/Health/domain/health';

describe('HealthInMemoryRepository', () => {
  let repository: HealthRepository;
  beforeEach(async () => {
    const repositoryProvider: Provider = {
      provide: HealthRepository,
      useClass: HealthInMemoryRepository,
    };
    const providers: Provider[] = [repositoryProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    repository = testModule.get<HealthRepository>(HealthRepository);
  });

  it('should ', () => {
    expect(repository).toBeDefined();
  });

  describe('check', () => {
    it('should return a health object', async () => {
      const health = new Health('up');
      const result = await repository.check();

      expect(result).toEqual(health);
    });

    it('should return a health object when into catch', async () => {
      repository.check = jest.fn().mockResolvedValue(new Health('down'));
      const health = new Health('down');
      const result = await repository.check();

      expect(result).toEqual(health);
    });
  });
});
