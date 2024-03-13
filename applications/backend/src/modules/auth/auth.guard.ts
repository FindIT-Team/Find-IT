import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // TODO: Decorator that explicit allows and disallow non-authenticated requests
    if (request.path.includes('auth') || request.path.includes('health'))
      return true;
    return request.isAuthenticated();
  }
}
