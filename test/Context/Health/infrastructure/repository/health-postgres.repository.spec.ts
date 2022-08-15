import { INestApplication, ModuleMetadata, Provider } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Config } from '../../../../__Mocks__/Common/config';

import { HealthRepository } from '../../../../../src/Context/Health/domain/health.repositoryts';
import { HealthPostgresRepository } from '../../../../../src/Context/Health/infrastructure/repository/health-postgres.repository';

import { HealthEntity } from '../../../../../src/Context/Health/infrastructure/entity/health.entity';
import { Health } from '../../../../../src/Context/Health/domain/health';
import { HealthModule } from '../../../../../src/Context/Health/health.module';

describe('HealthPostgresRepository', () => {
  let repository: HealthRepository;
  let connection: Repository<HealthEntity>;
  let app: INestApplication;
  const tokenRepository = getRepositoryToken(HealthEntity);

  beforeAll(async () => {
    const repositoryProvider: Provider = {
      provide: HealthRepository,
      useClass: HealthPostgresRepository,
    };
    const repositoryTypeORM: Provider = {
      provide: tokenRepository,
      useValue: {},
    };
    const providers: Provider[] = [repositoryProvider, repositoryTypeORM];
    const importsMock: any[] = [
      HealthModule,
      TypeOrmModule.forRoot({
        ...Config.dbTestConnection(),
        type: 'postgres',
        entities: [HealthEntity],
      }),
    ];
    const moduleMetadata: ModuleMetadata = { providers, imports: importsMock };
    const testModule = await Test.createTestingModule(moduleMetadata).compile();

    app = testModule.createNestApplication();
    repository = testModule.get<HealthRepository>(HealthRepository);
    connection = testModule.get(tokenRepository);
    await app.init();
  });

  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should defined', () => {
    expect(repository).toBeDefined();
  });

  describe('check', () => {
    it('should return an object that the artifact is down', async () => {
      connection.query = jest
        .fn()
        .mockImplementation()
        .mockRejectedValue(new Error('Connection'));
      const expected = new Health('down');
      const result = await repository.check();

      expect(result).toEqual(expected);
    });

    it('should return an object that the artifact is up', async () => {
      const expected = new Health('up');
      const result = await repository.check();

      expect(result).toEqual(expected);
    });
  });
});
