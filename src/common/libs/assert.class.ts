import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

/**
 * 断言并抛出 Http 错误
 */
export class Assert {
  private static assert(condition: boolean, errorFactory: () => Error) {
    if (!condition) {
      throw errorFactory();
    }
  }

  static badRequest(condition: boolean, message = '非法参数') {
    this.assert(condition, () => new BadRequestException(message));
  }

  static forbidden(condition: boolean, message = '禁止操作') {
    this.assert(condition, () => new ForbiddenException(message));
  }

  static notFound(condition: boolean, message = '未找到资源') {
    this.assert(condition, () => new NotFoundException(message));
  }

  static conflict(condition: boolean, message = '操作冲突') {
    this.assert(condition, () => new ConflictException(message));
  }

  static internal(condition: boolean, message = '内部数据异常') {
    this.assert(condition, () => new ConflictException(message));
  }

  static unauthorized(condition: boolean, message = '当前用户未认证') {
    this.assert(condition, () => new UnauthorizedException(message));
  }
}
