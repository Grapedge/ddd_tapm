import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { QueryBus } from '@nestjs/cqrs';
import { Request } from 'express';
import { FindContributorRoleQuery } from 'src/project/application/queries/find-contributor-role.query';
import { CtbRole, CTB_ROLES_KEY } from '../decorators/ctb-roles.decorator';
import { Assert } from '../libs/assert.class';

@Injectable()
export class CtbRolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly queryBus: QueryBus,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<CtbRole[]>(
      CTB_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();

    // 获取用户信息
    const contributorId: string = (request as any).user;
    Assert.unauthorized(!!contributorId, '请登录以使用系统');

    // 获取项目 Id
    const projectId: string =
      request.params.projectId ||
      request.body.projectId ||
      request.query.projectId;
    Assert.badRequest(!!projectId, '没有找到项目 Id');

    // 获取用户角色
    const ctbRole: CtbRole = await this.queryBus.execute(
      new FindContributorRoleQuery(projectId, contributorId),
    );

    Assert.forbidden(ctbRole !== undefined, '用户必须是项目贡献者');

    // 所有贡献者均有权限
    if (requiredRoles.length === 0) {
      return true;
    }

    Assert.forbidden(
      requiredRoles.includes(ctbRole),
      '贡献者无权限操作，请联系项目拥有者',
    );

    // 验证个权限真麻烦
    return true;
  }
}
