import { Module } from '@nestjs/common';
import { CommandBus, CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigModule } from '@sdu-turing/config';
import { join } from 'path';
import { AgileModule } from './agile-pm/agile.module';
import { AppConfig, AppConfigSchema } from './common/config/app.config';

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
    AgileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
