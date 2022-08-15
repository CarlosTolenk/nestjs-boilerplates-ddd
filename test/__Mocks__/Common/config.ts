export interface ConfigDb {
  readonly host: string;
  readonly port: number;
  readonly database: string;
  readonly username: string;
  readonly password: string;
  readonly synchronize: boolean;
  readonly logging: boolean;
}

export class Config {
  static dbTestConnection(): ConfigDb {
    return {
      host: 'localhost',
      port: 5431,
      username: 'postgres',
      password: 'postgres',
      database: 'testing',
      synchronize: true,
      logging: false,
    };
  }
}
