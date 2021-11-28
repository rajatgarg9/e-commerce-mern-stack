import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthService } from '@src/auth/auth.service';

import { AuthHeader } from '@src/auth/interfaces';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isAuthDisable =
      this.reflector.get<string[]>('isAuthDisable', context.getClass()) ||
      this.reflector.get<string[]>('isAuthDisable', context.getHandler());

    if (isAuthDisable) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers as AuthHeader;

    const user = await this.authService.validateAutorization(authorization);
    console.log(user, '++++++++++++++++++');
    if (!user) {
      return false;
    } else {
      request.user = user;
      return true;
    }
  }
}
