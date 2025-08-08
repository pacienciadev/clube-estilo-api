import {
  CallHandler,
  ConsoleLogger,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { Observable, tap } from 'rxjs';
import { Request, Response } from 'express';

import { UserRequest } from 'src/modules/auth/auth.interfaces';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
  constructor(private logger: ConsoleLogger) {}
  intercept(contexto: ExecutionContext, next: CallHandler): Observable<any> {
    const contextHttp = contexto.switchToHttp();

    const request = contextHttp.getRequest<Request | UserRequest>();
    const response = contextHttp.getResponse<Response>();

    const { path, method } = request;
    const { statusCode } = response;

    this.logger.log(`${method} ${path}`);

    const instantePreControlador = Date.now();

    return next.handle().pipe(
      tap(() => {
        if ('user' in request) {
          this.logger.log(`Rota acessada pelo usuário: ${request.user.sub}`);
        }

        const tempoDeExecucaoDaRota = Date.now() - instantePreControlador;

        this.logger.log(
          `Resposta: status ${statusCode} - ${tempoDeExecucaoDaRota}ms`,
        );
      }),
    );
  }
}
