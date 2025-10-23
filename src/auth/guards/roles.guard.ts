import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { Reflector } from '@nestjs/core';

import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    
    if (!requiredRoles) {
      return true;
    }
    
    const { user } = context.switchToHttp().getRequest();
    
    const hasRole = () =>
      requiredRoles.some((role) => user?.affiliation === role);

    if (user && hasRole()) {
      return true; // Usuário tem a permissão!
    }

    // Se não tem permissão, bloqueia.
    throw new ForbiddenException(
      'Você não tem permissão para acessar este recurso.',
    );
  }
}
