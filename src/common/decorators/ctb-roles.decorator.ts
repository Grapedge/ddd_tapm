import { SetMetadata } from '@nestjs/common';
import { ContributorRole as CtbRole } from 'src/project/domain/contributor/contributor-role';

export const CTB_ROLES_KEY = Symbol('贡献者权限');

export { CtbRole };
/**
 * 贡献者权限。因为 Contributor 实在是太长了，所以缩写成 Ctb。
 * 如果留空，则为全部贡献者均可。
 * @param roles
 */
export function CtbRoles(...roles: CtbRole[]) {
  return SetMetadata(CTB_ROLES_KEY, roles);
}
