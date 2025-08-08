import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { Request } from 'express';

import { UserPayload, UserRequest } from './auth.interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(contexto: ExecutionContext): Promise<boolean> {
    const request = contexto.switchToHttp().getRequest<UserRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('Erro de autenticação');
    }

    try {
      const payload: UserPayload = await this.jwtService.verifyAsync(token);

      request.user = payload;
    } catch (error) {
      console.error(error);

      throw new UnauthorizedException('JWT inválido');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
