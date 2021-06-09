import { applyDecorators } from '@nestjs/common';
import { CtbRole, CtbRoles } from './ctb-roles.decorator';
import { TapmAuth } from './tapm-auth.decorator';

export const AuthCtbRoles = (...roles: CtbRole[]) =>
  applyDecorators(TapmAuth(), CtbRoles(...roles));
