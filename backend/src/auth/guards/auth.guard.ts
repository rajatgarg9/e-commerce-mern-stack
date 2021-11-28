import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { AuthService } from '@src/auth/auth.service';

import { UNAUTHORIZED } from '@src/auth/utilities/messages';

import { IAuthHeader } from '@src/auth/interfaces';

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
    const { authorization } = request.headers as IAuthHeader;

    const user = await this.authService.validateAutorization(authorization);

    if (!user) {
      throw new UnauthorizedException(UNAUTHORIZED);
    } else {
      request.user = user;
      return true;
    }
  }
}
