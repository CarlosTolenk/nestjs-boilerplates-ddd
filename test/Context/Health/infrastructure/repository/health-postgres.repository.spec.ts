import { ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { HealthRepository } from '../../../../../src/Context/Health/domain/health.repositoryts';
import { HealthPostgresRepository } from '../../../../../src/Context/Health/infrastructure/repository/health-postgres.repository';

describe('HealthPostgresRepository', () => {
  let repository: HealthRepository;
  beforeEach(async () => {
    const repositoryProvider: Provider = {
      provide: HealthRepository,
      useClass: HealthPostgresRepository,
    };
    const providers: Provider[] = [repositoryProvider];
    const moduleMetadata: ModuleMetadata = { providers };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    repository = testModule.get<HealthRepository>(HealthRepository);
  });

  it('should', () => {
    expect(repository).toBeDefined();
  });
});
