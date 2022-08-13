import { HealthIndicatorStatus } from '@nestjs/terminus/dist/health-indicator/health-indicator-result.interface';

export class Health {
  status: HealthIndicatorStatus;
  constructor(status: HealthIndicatorStatus) {
    this.status = status;
  }
}
