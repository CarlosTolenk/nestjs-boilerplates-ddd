import { Injectable } from '@nestjs/common';

import { Health } from '../domain/health';
import { HealthRepository } from '../domain/health.repositoryts';
import { HealthIndicatorResult } from '@nestjs/terminus/dist/health-indicator/health-indicator-result.interface';

@Injectable()
export class HealthService {
  constructor(private repository: HealthRepository) {}

  checkLiveness(): Promise<Health> {
    return Promise.resolve(new Health('up'));
  }

  async checkReadiness(): Promise<HealthIndicatorResult> {
    const health = await this.repository.check();
    return { database: { status: health.status } };
  }
}
