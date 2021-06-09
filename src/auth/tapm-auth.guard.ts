import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class TapmAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    request.user = '2018000301111';
    return true;
  }
}
