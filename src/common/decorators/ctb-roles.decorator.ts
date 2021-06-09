import { applyDecorators, UseGuards } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { ApiForbiddenResponse } from '@nestjs/swagger';
import { TapmAuthGuard } from 'src/auth/tapm-auth.guard';
import { ContributorRole as CtbRole } from 'src/project/domain/contributor/contributor-role';
import { CtbRolesGuard } from '../guards/ctb-roles.guard';
import { ApiTapmAuth } from './api-tapm-auth.decorator';

export const CTB_ROLES_KEY = Symbol('贡献者权限');

export { CtbRole };
/**
 * 贡献者权限。自动添加鉴权守卫。
 * 如果留空，则为全部贡献者均可。
 * @param roles
 */
export function CtbRoles(...roles: CtbRole[]) {
  return applyDecorators(
    UseGuards(TapmAuthGuard, CtbRolesGuard),
    SetMetadata(CTB_ROLES_KEY, roles),
    ApiTapmAuth(),
    ApiForbiddenResponse({
      description: '用户必须是项目的贡献者，或是项目拥有者才能操作',
    }),
  );
}
