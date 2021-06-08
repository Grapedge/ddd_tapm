import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('山软图灵敏捷项目管理')
    .setDescription('山软图灵敏捷项目管理 API 文档')
    .setVersion('1.0')
    // 用于用户认证
    .addBearerAuth()
    // 用于图灵课程认证
    .addBasicAuth()
    .addTag('产品')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
  Logger.log(`Api 文档：${await app.getUrl()}/api`, 'SwaggerUI');
}

bootstrap();
