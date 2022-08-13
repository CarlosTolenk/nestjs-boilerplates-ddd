import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

// Domain
import { HealthRepository } from './domain/health.repositoryts';

// Application
import { HealthService } from './application/health.service';

// infrastructure
import { InMemoryHealthRepository } from './infrastructure/db/InMemoryHealthRepository';

// Interfaces
import { HealthController } from './interfaces/healthController';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [
    HealthService,
    {
      provide: HealthRepository,
      useClass: InMemoryHealthRepository,
    },
  ],
})
export class HealthModule {}
