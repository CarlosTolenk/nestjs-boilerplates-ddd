import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { HealthRepository } from '../../domain/health.repositoryts';
import { Health } from '../../domain/health';
import { HealthEntity } from '../entity/health.entity';

export class HealthPostgresRepository extends HealthRepository {
  constructor(
    @InjectRepository(HealthEntity)
    private readonly repository: Repository<HealthEntity>,
  ) {
    super();
  }

  async check(): Promise<Health> {
    try {
      await this.repository.query(`SELECT 1 AS health`);
      return Promise.resolve(new Health('up'));
    } catch (error) {
      return Promise.resolve(new Health('down'));
    }
  }
}
