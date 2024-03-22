import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Socket } from '../../utils/socket.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isAuthenticated = this.reflector.getAllAndOverride<
      boolean | undefined
    >('authenticated', [context.getHandler(), context.getClass()]);

    if (!isAuthenticated) return true;

    let userCheck: () => boolean;

    if (context.getType() === 'http')
      userCheck = (context.switchToHttp().getRequest() as Request)
        .isAuthenticated;
    else if (context.getType() === 'ws')
      userCheck = (context.switchToWs().getClient() as Socket).request
        .isAuthenticated;
    else return false;

    return userCheck();
  }
}
