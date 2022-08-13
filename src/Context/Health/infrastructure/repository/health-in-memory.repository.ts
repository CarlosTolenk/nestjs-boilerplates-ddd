import { HealthRepository } from '../../domain/health.repositoryts';
import { Health } from '../../domain/health';

export class HealthInMemoryRepository extends HealthRepository {
  check(): Promise<Health> {
    try {
      const health = new Health('up');
      return Promise.resolve(health);
    } catch (error) {
      const health = new Health('down');
      return Promise.resolve(health);
    }
  }
}
