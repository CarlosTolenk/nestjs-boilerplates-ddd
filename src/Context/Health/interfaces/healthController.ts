import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
} from '@nestjs/terminus';

import { Health } from '../domain/health';

import { HealthService } from '../application/health.service';

@Controller()
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
    private readonly health: HealthCheckService,
  ) {}

  @Get('liveness')
  @HealthCheck()
  async checkLiveness(): Promise<HealthCheckResult> {
    await this.healthService.checkLiveness();
    return this.health.check([]);
  }

  @Get('health')
  @HealthCheck()
  async checkReadiness(): Promise<HealthCheckResult> {
    const result = await this.healthService.checkReadiness();
    return this.health.check([() => result]);
  }
}
