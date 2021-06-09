import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export const ApiTapmAuth = () =>
  applyDecorators(
    ApiBearerAuth('TAPM'),
    ApiUnauthorizedResponse({
      description: '用户需要登录 TAPM 系统',
    }),
  );
