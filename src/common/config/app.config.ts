// config/user.config.ts
import { Env } from '@sdu-turing/config';
import { IsString } from 'class-validator';

export class AppConfigSchema {
  @IsString()
  MONGO_URI: string;
}

export class AppConfig {
  mongoUri: string;

  constructor(@Env() env: AppConfigSchema) {
    this.mongoUri = env.MONGO_URI;
  }
}
