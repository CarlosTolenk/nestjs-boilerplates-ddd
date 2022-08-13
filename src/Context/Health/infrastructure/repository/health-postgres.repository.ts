import { getRepository } from 'typeorm';

import { HealthRepository } from '../../domain/health.repositoryts';
import { Health } from '../../domain/health';
import { HealthEntity } from '../enitity/health.entity';

export class HealthPostgresRepository extends HealthRepository {
  async check(): Promise<Health> {
    try {
      await getRepository(HealthEntity).query('SELECT 1 AS health');
      return Promise.resolve(new Health('up'));
    } catch (error) {
      return Promise.resolve(new Health('down'));
    }
  }
}
