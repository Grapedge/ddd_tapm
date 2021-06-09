import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ThrottlerException } from '@nestjs/throttler';

@Catch(HttpException)
export class HttpExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  catch(exception: HttpException, host: ArgumentsHost) {
    if (exception instanceof ThrottlerException) {
      exception = new ThrottlerException('请求次数过多，请稍后再试');
    }
    super.catch(exception, host);
  }
}
