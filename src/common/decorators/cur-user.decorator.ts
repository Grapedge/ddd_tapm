import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurUser = createParamDecorator(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (_: unknown, ctx: ExecutionContext) => {
    // const request = ctx.switchToHttp().getRequest();
    // return request.user;
    // TODO: 拿到真实用户
    return '2018000301111';
  },
);
