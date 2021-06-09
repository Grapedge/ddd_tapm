import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
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
    GatewayModule,
    ProjectModule,
  ],
})
export class AppModule {}
