import { Health } from './health';

export abstract class HealthRepository {
  abstract check(): Promise<Health>;
}
