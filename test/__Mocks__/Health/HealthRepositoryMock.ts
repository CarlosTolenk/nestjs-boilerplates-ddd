import { HealthRepository } from '../../../src/Context/Health/domain/health.repositoryts';
import { Health } from '../../../src/Context/Health/domain/health';

export class HealthRepositoryMock extends HealthRepository {
  check(): Promise<Health> {
    return Promise.resolve(undefined);
  }
}
