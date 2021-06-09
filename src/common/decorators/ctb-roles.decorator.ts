import { applyDecorators, UseGuards } from '@nestjs/common';
import { SetMetadata } from '@nestjs/common';
import { ApiForbiddenResponse } from '@nestjs/swagger';
import { ContributorRole as CtbRole } from 'src/project/domain/contributor/contributor-role';
import { CtbRolesGuard } from '../guards/ctb-roles.guard';

export const CTB_ROLES_KEY = Symbol('贡献者权限');

export { CtbRole };
/**
 * 贡献者权限。因为 Contributor 实在是太长了，所以缩写成 Ctb。
 * 如果留空，则为全部贡献者均可。
 * @param roles
 */
export function CtbRoles(...roles: CtbRole[]) {
  return applyDecorators(
    UseGuards(CtbRolesGuard),
    SetMetadata(CTB_ROLES_KEY, roles),
    ApiForbiddenResponse({
      description: '用户必须是项目的贡献者，或是项目拥有者才能操作',
    }),
  );
}
