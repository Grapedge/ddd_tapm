import { applyDecorators, UseGuards } from '@nestjs/common';
import { TapmAuthGuard } from 'src/auth/tapm-auth.guard';
import { ApiTapmAuth } from './api-tapm-auth.decorator';

export const TapmAuth = () =>
  applyDecorators(UseGuards(TapmAuthGuard), ApiTapmAuth());
