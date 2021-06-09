import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@sdu-turing/config';
import { join } from 'path';
import { AppConfig, AppConfigSchema } from './common/config/app.config';
import { GatewayModule } from './gateway/gateway.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ConfigModule.forRoot({
      schemas: [AppConfigSchema],
      configs: [AppConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory: (appConfig: AppConfig) => ({
        useCreateIndex: true,
        uri: appConfig.mongoUri,
      }),
      inject: [AppConfig],
    }),
    ThrottlerModule.forRootAsync({
      useFactory: (appConfig: AppConfig) => ({
        ttl: appConfig.throttleTtl,
        limit: appConfig.throttleLimit,
      }),
      inject: [AppConfig],
    }),
    CqrsModule,
    GatewayModule,
    ProjectModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
