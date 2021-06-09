import { BadRequestException, Logger, ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: () => new BadRequestException('请求非法'),
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('山软图灵敏捷项目管理')
    .setDescription('山软图灵敏捷项目管理 API 文档')
    .setVersion('1.0')
    // 用于用户认证
    .addBearerAuth(undefined, 'TAPM')
    // 用于图灵课程认证
    .addBasicAuth(undefined, '图灵综合教学平台')
    .addTag('项目')
    .addTag('Git 仓库')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
  Logger.log(`Api 文档：${await app.getUrl()}/api`, 'SwaggerUI');
}

bootstrap();
