// config/user.config.ts
import { Env } from '@sdu-turing/config';
import { Type } from 'class-transformer';
import { IsInt, IsString } from 'class-validator';

export class AppConfigSchema {
  @IsString()
  MONGO_URI: string;

  @IsInt()
  @Type(() => Number)
  THROTTLE_TTL: number;

  @IsInt()
  @Type(() => Number)
  THROTTLE_LIMIT: number;
}

export class AppConfig {
  mongoUri: string;

  throttleTtl: number;

  throttleLimit: number;

  constructor(@Env() env: AppConfigSchema) {
    this.mongoUri = env.MONGO_URI;
    this.throttleTtl = Number(env.THROTTLE_TTL);
    this.throttleLimit = Number(env.THROTTLE_LIMIT);
  }
}
