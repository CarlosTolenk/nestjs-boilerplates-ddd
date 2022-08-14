import { Logger, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

// Domain
import { HealthRepository } from './domain/health.repositoryts';

// Application
import { HealthService } from './application/health.service';

// infrastructure
import { HealthPostgresRepository } from './infrastructure/repository/health-postgres.repository';

// Interfaces
import { HealthController } from './interfaces/health.controller';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [
    Logger,
    HealthService,
    {
      provide: HealthRepository,
      useClass: HealthPostgresRepository,
    },
  ],
})
export class HealthModule {}
