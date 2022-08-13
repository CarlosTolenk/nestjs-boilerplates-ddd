import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
} from '@nestjs/terminus';

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
    try {
      await this.healthService.checkLiveness();
      return this.health.check([]);
    } catch (error) {
      return error;
    }
  }

  @Get('health')
  @HealthCheck()
  async checkReadiness(): Promise<HealthCheckResult> {
    try {
      const result = await this.healthService.checkReadiness();
      return this.health.check([() => result]);
    } catch (error) {
      return error;
    }
  }
}
