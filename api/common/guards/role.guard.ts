import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'common/decorators/role.decorator';
import { Role } from 'common/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const { account } = request;
    if(requiredRoles.includes(Role.Admin)) {
      if(account.isAdmin === true) {
        return true
      }
    }
    if(requiredRoles.includes(Role.User)) {
      if(account.isAdmin === false) {
        return true
      }
    }
    return false
  }
}