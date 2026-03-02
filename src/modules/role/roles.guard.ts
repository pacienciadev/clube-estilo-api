import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { Role, ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 1. Pega os roles exigidos na rota (através do decorator @Roles)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se a rota não tiver o decorator @Roles, ela é pública (ou apenas exige login)
    if (!requiredRoles) {
      return true;
    }

    // 2. Pega o usuário que foi injetado no request pelo AuthGuard
    const { user } = context.switchToHttp().getRequest();

    // 3. Verifica se o role do usuário está na lista de roles permitidos
    const hasRole = requiredRoles.some((role) => user.role === role);

    if (!hasRole) {
      throw new ForbiddenException(
        'Você não tem permissão para acessar este recurso',
      );
    }

    return true;
  }
}
