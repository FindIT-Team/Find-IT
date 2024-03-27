import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { $Enums } from '@prisma/client';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { Socket } from '../../utils/socket.type';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<$Enums.UserRole[]>(
      'roles',
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles) return true;

    let user: Express.User;

    if (context.getType() === 'http')
      user = (context.switchToHttp().getRequest() as Request).user;
    else if (context.getType() === 'ws')
      user = (context.switchToWs().getClient() as Socket).request.user;
    else return false;

    return requiredRoles.some((role) => user.role === role);
  }
}
